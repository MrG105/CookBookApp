const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
    },
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { _id }) => {
      return Recipe.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    // addRecipe: async (parent, args, context) => {
    //   if (context.user) {
    //     const recipe = await Recipe.create({ ...args, username: context.user.username });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { recipe: recipe._id } },
    //       { new: true }
    //     );

    //     return recipe;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    addRecipe: async (parent, args, context) => {
      console.log(context.user);
      console.log( args);
      return User.findOneAndUpdate(
          { _id: context.user._id},
          {
              $push: {
                 savedRecipes: args.input
              }
          },
          {
              new: true,
              runValidators: true,
          }
      );
  },
  removeRecipe: async (parent, args, context) => {
    console.log(context);
    console.log(args, context.user);
    return User.findOneAndUpdate(
    
      {_id: '61596c822d38428d7123d5cb'},
      {$pull: {savedRecipes: {recipeId: '321933'}}},
      {new: true}
    )
  }
  }
};

module.exports = resolvers;

