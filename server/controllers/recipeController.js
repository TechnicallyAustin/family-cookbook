const db = require('../db');
const Recipe = require('../models/Recipe');

exports.getRecipes = async (req, res) => {
    try {
        console.log("DB name:", Recipe.db.name);
        console.log("Collection:", Recipe.collection.name);
      const recipes = await Recipe.find();
      res.json(recipes);
      console.log(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error'  });
    }
};

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await db.getRecipeById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const recipe = await db.createRecipe(req.body);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await db.updateRecipe(req.params.id, req.body);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        await db.deleteRecipe(req.params.id);
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};