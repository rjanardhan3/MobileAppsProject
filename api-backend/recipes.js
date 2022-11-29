require('dotenv').config();
const https = require('https');

let num_recipes = 5;
let ignore_pantry = true;
let ranking = 2; //2 = minimize unused ingredients


function get_recipe_id(ingredients, callback) {
    let path = "/recipes/findByIngredients?";
    path += "ingredients=" + get_query_string_list(ingredients)
    path += "&number=" + num_recipes;
    path += "&ignorePantry=" + ignore_pantry;
    path += "&ranking=" + ranking; 

    const options = {
        "method": "GET",
        "hostname": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "port": null,
        "path": path,
        "headers": {
            "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY,
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const req = https.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);

            const recipe_data = JSON.parse(body.toString());
            callback(recipe_data)
        });
    });
    
    req.end();
}

function get_recipe_instructions(recipe_ids, callback) {
    let path = "/recipes/informationBulk?ids=";
    path += recipe_ids.join(",");

    const options = {
        "method": "GET",
        "hostname": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "port": null,
        "path": path,
        "headers": {
            "X-RapidAPI-Key": process.env.SPOONACULAR_API_KEY,
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const req = https.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            
            const recipe_instructions = JSON.parse(body.toString());
            callback(recipe_instructions)
        });
    });
    
    req.end();
}

function grab_recipe_ids_from_data(recipe_data) {
    let recipe_list = [];
    for (var i = 0; i < recipe_data.length; i++) {
        recipe_list.push(recipe_data[i].id);
    }
    return recipe_list;
}

function get_query_string_list(ingredients) {
    let ingredients_list = ingredients.split(",");
    let query_ingredient_string = "";
    for (var i = 0; i < ingredients_list.length; i++) {
        let ingredient = ingredients_list[i].trim();
        ingredient = ingredient.replace(/ /g, "%20");
        if (i == 0) {
            query_ingredient_string += ingredient;
        } else {
            query_ingredient_string += ",+" + ingredient;
        }
    }

    return query_ingredient_string;
}


function format_instructions(instructions) {
    if (instructions == null || instructions.length == 0) {
        return ["No instructions available for this recipe"];
    }

    instructions = instructions.split(/<\S{0,}>/).join('\n').split('\n')
    for (var i = 0; i < instructions.length; i++) {
        if (instructions[i].trim().length == 0) {
            instructions.splice(i,1);
        }
    }

    return instructions;
}

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