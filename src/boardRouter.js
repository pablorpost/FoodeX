import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', { 
        recipes: recipesService.getRecipes()
    });
});

router.get('/showMore/:id', (req, res) => {

    let recipe = recipesService.getRecipe(req.params.id);
    console.log

    res.render('show_recipe', {
        RecipeTitle: recipe.getName(),
        RecipeDescription: recipe.getDescription(),
        RecipeIngredients: recipe.getIngredients(),
        RecipePreparation: recipe.getPreparation(),
        id: req.params.id,
        RecipePhotos:recipe.getImages()
    });
});

router.get('/showMore/:id/delete', (req, res) => {
    recipesService.deleteRecipe(req.params.id)
});
/*
router.get('/showMore/:id/edit', (req, res) => {


});
*/

export default router;