const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const recipeSchema = require('./Recipe')

const userSchema = new Schema ({
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
          type: String,
          required: true,
        },
        savedrecipes: [recipeSchema],
    },
)

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;