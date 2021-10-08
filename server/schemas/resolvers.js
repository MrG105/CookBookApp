const { AuthenticationError } = require('apollo-server-express');
// const { default: context } = require('react-bootstrap/esm/AccordionContext');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');
const {ObjectId} = require('mongojs');
const mongoose = require('mongoose')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('savedRecipes').select('-__v -password')


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
    recipes: async (parent, args, context) => {
      
      return Recipe.find();
    },
    recipe: async (parent, args, context) => {
      const url = context.rawHeaders[13].split('/').pop();

      console.log('recipess:', url);
      return Recipe.findOne({_id: url});
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
    addRecipe: async (parent, args, context) => {
      console.log('args', args)
      console.log('context', context.user._id)
    
          args.input.author = context.user.username          
          const recipe = await Recipe.create({
            ...args.input
          }
          );

          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedRecipes: recipe } },
            { new: true }
          );
          return recipe
      // throw new AuthenticationError('You need to be logged in!');
    },
    // bookmark: async (parent, args, context) => {
    //   console.log('args', args);
    //   const recipe = await Recipe.findOne({_id: "615f97d50c9ace37cd37e33a"});
    //   console.log('recipe', recipe);
    //   return await User.findByIdAndUpdate(
    //     { _id: '615fa2ba626437fb4227d80d' },
    //     {$push: { bookmarked: {...recipe} } },
    //     { new: true }
    //   );
  bookmark: async (parent, { recipe }, context) => {
    const bookmark = await User.findByIdAndUpdate(
      { _id: context.user._id },
      { $push: { bookmarked: recipe }},                
      { new: true }
    ).populate('bookmarked');
    return bookmark;
  },


    
  removeRecipe: async (parent, args, context) => {
    console.log(args);
    const { recipeId } = args
    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      author: context.user.username,
    });

    const recipeIdObject = ObjectId(recipeId)

    return await User.findOneAndUpdate(
      {_id: context.user._id},
      { $pull: { savedRecipes: recipeIdObject}}
    );
  },
  
  editRecipe: async (parent, args, context) => {
    const url = context.rawHeaders[13].split('/').pop();
    console.log('edit', url, args, context.user)
    const recipeIdObject = ObjectId(url)
    return await Recipe.findByIdAndUpdate(url, args.input, {new: true});
  }
  }
};


module.exports = resolvers;

