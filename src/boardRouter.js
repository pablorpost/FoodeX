import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("\ntpm\n")
    res.render('index', { 
        recipes: recipesService.getRecipes(),
        
    });
});

router.get('/showMore/:id', (req, res) => {

    console.log(req.params.id)
    let recipe = recipesService.getRecipe(req.params.id);
    console.log(recipe)

    res.render('show_recipe', recipe);
});

router.get('/showMore/:id/delete', (req, res) => {
    recipesService.deleteRecipe(req.params.id)
    res.redirect('/');
});

router.get('/showMore/:id/edit', (req, res) => {
    res.render('add',{ 
        recipe: recipesService.getRecipe(req.params.id)
    });
});


router.get('/add', (req, res) => {
    res.render('add',{ 
        recipe: recipesService.getEmptyRecipe()
    });
});


router.post('/add', (req, res) => {
    let {recipeName, recipeDescription , recipeSteps , recipeIngredients, recipePhotos} = req.body;
    boardService.addRecipe({recipeName, recipeDescription , recipePhotos, recipeIngredients, recipeSteps  });
    res.redirect('/');
});

export default router;