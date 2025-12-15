const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: [String], required: true},
    image: {type: String, required: true},
    date: { type: Date, default: Date.now }
}, {collection: 'recipe'}); 

module.exports = mongoose.model('Recipe', RecipeSchema);