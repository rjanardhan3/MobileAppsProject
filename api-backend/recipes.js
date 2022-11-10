require('dotenv').config();
const https = require('https');

let num_recipes = 5;
let ignore_pantry = true;


function get_recipe_id(ingredients, callback) {
    url = "https://api.spoonacular.com/recipes/findByIngredients?"
    url += "ingredients=" + get_query_string_list(ingredients)
    url += "&number=" + num_recipes;
    url += "&ignorePantry=" + ignore_pantry;
    url += "&ranking=2"; //2 = minimize unused ingredients
    url += "&apiKey=" + process.env.SPOONACULAR_API_KEY;
    
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const recipe_data = JSON.parse(data);
            callback(recipe_data)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function get_recipe_instructions(recipe_ids, callback) {
    url = "https://api.spoonacular.com/recipes/informationBulk?ids=";
    url += recipe_ids.join(",");
    url += "&apiKey=" + process.env.SPOONACULAR_API_KEY;

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const recipe_instructions = JSON.parse(data);
            callback(recipe_instructions)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function get_query_string_list(ingredients) {
    let ingredients_list = ingredients.split(",");
    let query_ingredient_string = "";
    for (var i = 0; i < ingredients_list.length; i++) {

        if (i == 0) {
            query_ingredient_string += ingredients_list[i].trim();
        } else {
            query_ingredient_string += ",+" + ingredients_list[i].trim();
        }
    }
    return query_ingredient_string;
}

function grab_recipe_ids_from_data(recipe_data) {
    let recipe_list = [];
    for (var i = 0; i < recipe_data.length; i++) {
        recipe_list.push(recipe_data[i].id);
    }
    return recipe_list;
}


function format_instructions(instructions) {
    instructions = instructions.split(/<\S{0,}>/).join('\n').split('\n')
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i].trim().length == 0) {
            instructions.splice(i,1);
        }
    }

    return instructions;
}


//Cut the bottom off the onion and save for stock\n\nPeel off the papery skin and scoop out the top\n\nFill the scooped-out part with butter and bouillon/soy/Worcestershire\n\nWrap in aluminum foil\n\nBake at 350°F for about 60 minutes or until fork tender\n\nRemove from the oven and serve by itself or as a side dish
function make_recipe_data_json(recipe_information, recipe_instructions) {
    let recipe_data_list = []

    for (var i = 0; i < num_recipes; i++) {
        let formatted_instructions = format_instructions(recipe_instructions[i].instructions)

        let recipe_data = {
            id: recipe_information[i].id,
            title: recipe_information[i].title,
            image: recipe_information[i].image,
            imageType: recipe_information[i].imageType,
            healthScore: recipe_instructions[i].healthScore,
            readyInMinutes: recipe_instructions[i].readyInMinutes,
            dishTypes: recipe_instructions[i].dishTypes,
            diets: recipe_instructions[i].diets,
            instructions: formatted_instructions
        }

        let usedIngredients = [];
        for (var j = 0; j < recipe_information[i].usedIngredients.length; j++) {
            usedIngredients.push(recipe_information[i].usedIngredients[j].original);
        }

        let missedIngredients = [];
        for (var k = 0; k < recipe_information[i].missedIngredients.length; k++) {
            missedIngredients.push(recipe_information[i].missedIngredients[k].original);
        }

        let unusedIngredients = [];
        for (var l = 0; l < recipe_information[i].unusedIngredients.length; l++) {
            unusedIngredients.push(recipe_information[i].unusedIngredients[l].original);
        }

        recipe_data.usedIngredients = usedIngredients;
        recipe_data.missedIngredients = missedIngredients;
        recipe_data.unusedIngredients = unusedIngredients;

        recipe_data_list.push(recipe_data);
    }

    return recipe_data_list;
}

module.exports = {
    get_recipe_id,
    get_recipe_instructions,
    grab_recipe_ids_from_data,
    make_recipe_data_json
};