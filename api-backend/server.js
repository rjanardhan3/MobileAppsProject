const express = require('express');
const app = express();
const bodyParser= require('body-parser')
require('dotenv').config();
const cors = require('cors')
const {get_recipe_id, get_recipe_instructions, grab_recipe_ids_from_data, make_recipe_data_json}= require('./recipes.js')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

connectionString = process.env.DATABASE_URL

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)

    console.log('Connected to Database')
    const db = client.db('MobileAppsProject')
    const recipesCollection = db.collection('recipes')


    app.use(bodyParser.json())
    app.use(cors())

    app.get('/recipes', (req, res) => {
        ingredient_list = req.query.ingredients;
        api_key = req.query.api_key;

        if (api_key != process.env.API_KEY) {
            res.status(403).send({
                body: {
                    response: "Invalid API Key."
                }
            })
        }

        if (ingredient_list == undefined || Object.keys(ingredient_list).length === 0) {
            res.status(400).send({
                body: {
                    response: "No ingredients were passed in as params."
                }
            })
        } else {
            get_recipe_id(ingredient_list, function(recipe_information_list) {
                let recipe_data_list = [];
                let recipe_response = "Recipes have been found successfully.";
                if (recipe_information_list.length == 0) {
                    recipe_response = "No recipes have been found with the given ingredients.";
                } else {
                    recipe_ids = grab_recipe_ids_from_data(recipe_information_list)
                    get_recipe_instructions(recipe_ids, function(recipe_instructions) {
                        if (recipe_instructions.length == 0) {
                            recipe_response = "No recipe instructions have been found for the given recipe.";
                            res.status(400).send({
                                body: {
                                    response: recipe_response,
                                }
                            })
                        } else {
                            recipe_data_list = make_recipe_data_json(recipe_information_list, recipe_instructions);
                            recipesCollection.insertMany(recipe_data_list)
                                .then(result => {
                                    res.status(200).send({
                                        body: {
                                            response: recipe_response,
                                            recipes: recipe_data_list
                                        }
                                    })
                                })
                                .catch(error => {
                                    console.error(error)
                                    res.status(400).send({
                                        body: {
                                            response: "Recipe instructions were unable to be added to the database. This may be because some recipes are duplicates and already in the database.",
                                            recipes: recipe_data_list
                                        }
                                    })
                                })   
                        }
                    })
                }
            })
        }
    })

    app.get('/previous-recipes', (req, res) => {
        const cursor = recipesCollection.find().toArray()
            .then(results => {
                res.status(200).send({
                    body: results
                })
            })
            .catch(error => {
                res.sendStatus(400)
            })
    })

    app.post('/add-recipe', (req, res) => {
        const received_request = req.body;
        recipesCollection.insertOne(received_request)
            .then(result => {
                res.status(200).send({
                    response: "Recipe has been successfully added."
                })
            })
            .catch(error => console.error(error))
    })

    app.delete("/delete-recipes", (req, res) => {
        recipesCollection.deleteMany({})
            .then(result => {
              res.status(200).send({
                response: "All recipes have been successfully deleted."
              })
            })
            .catch(error => {
                console.error(error)
                res.sendStatus(500)
            })
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000 in local or a PORT in Render')
})