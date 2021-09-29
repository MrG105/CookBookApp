const {User, Recipe} = require('../models');

const resolvers = {
    Query: {
        user: async() => {
            return User.find({});
        },
        recipe: async(parent, {_id}) =>{
            const params = _id? {_id} : {};
            return Recipe.find(params);
        },
    },
    Mutation: {
        createRecipe: async (parent, args) => {
            const recipe = await Recipe.create(args);
            return recipe;
        },

       createUser: async (parent, args) => {
           const user = await User.create(args);
           return user;
       }

    }
};

module.exports = resolvers;