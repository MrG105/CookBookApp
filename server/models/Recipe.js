const { Schema } = require('mongoose');

const recipeSchema = new Schema({
    // recipeId: {
    //     type: String,
    //     required: true,
    // },
    author:
    {
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

module.exports = recipeSchema