const { Schema, model } = require('mongoose');

const recipeSchema = new Schema ({
    authorName: [
        {
            type: String,
        },
    ],
    content : {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    recipeName: {
        type: String,
    },
    
});

module.exports = recipeSchema