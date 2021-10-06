const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    author: {
            type: String,

    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    recipeName: {
        type: String,
        required: true,
    },
    
});


const Recipe = mongoose.model("Recipe", recipeSchema);


module.exports = Recipe;

