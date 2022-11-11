const express = require('express');
const app = express();
const bodyParser= require('body-parser')
require('dotenv').config();
const cors = require('cors')
const {get_recipe_id, get_recipe_instructions, grab_recipe_ids_from_data, make_recipe_data_json}= require('./recipes.js')

const AWS = require("aws-sdk");
const fs = require("fs");

app.use(bodyParser.json())
app.use(cors())

const sageMakerRuntime = new AWS.SageMakerRuntime({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

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
                    } else {
                        recipe_data_list = make_recipe_data_json(recipe_information_list, recipe_instructions);
                        res.status(200).send({
                            body: {
                                response: recipe_response,
                                recipes: recipe_data_list
                            }
                        })
                    }
                })
            }
        })
    }
  })


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000 in local or a PORT in Render')
})