const { Schema } = require('mongoose');

const recipeSchema = new Schema({    
    author:
    {
        type: String,
    },
    content: {
        type: String,
        
    },
    image: {
        type: String,
    },
    recipeName: {
        type: String,
        
    },

});

module.exports = recipeSchema