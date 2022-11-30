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

    res.render('show_recipe', { recipe });
});

export default router;