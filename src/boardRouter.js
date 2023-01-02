import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("\ntpm\n")
    res.render('index', { 
        recipes: recipesService.getRecipes(0,5)
    });
});

router.get('/moreRecipes', (req, res) => {
    console.log("\ntpmore\n")
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to); 
    res.render('recetasindex', { 
        recipes: recipesService.getRecipes(from, to)
    });
});

router.get('/showMore/:id', (req, res) => {
    let recipe = recipesService.getRecipe(req.params.id);
    res.render('show_recipe', recipe);
});

router.get('/showMore/:id/delete', (req, res) => {
    let recipe = recipesService.getRecipe(req.params.id);
    res.render('conf', recipe);
});

router.get('/showMore/:id/trudelete', (req, res) => {
    recipesService.deleteRecipe(req.params.id)
    res.redirect('/')
});

function getRecipeFromForm(reqBody){
    let name = reqBody.nombre;
    let description = reqBody.description;
    let ingred = reqBody.ingred;
    let ingredMap = new Map();
    let sum = 0;
    if (ingred) {
        for(const l of ingred){sum += l.length}
        if (ingred.length!=sum) {
            for (let i = 0; i < ingred.length; i++) {
                ingredMap.set(i, ingred[i]);
            }
        } else {
            ingredMap.set(0, ingred);
        }
    }

    let steps = reqBody.steps;
    let stepMap = new Map();
    sum = 0
    if (steps) {
        for(const l of ingred){sum += l.length}
        if (steps.length!=sum) {
            for (let i = 0; i < steps.length; i++) {
                stepMap.set(i, steps[i]);
            }
        } else {
            stepMap.set(0, steps);
        }
    }

    
    let images = new Map();
    images.set(0, '/Resources/fotoPredeterminadaDeReceta.jpg');
    return [name, description, images, ingredMap, stepMap]
}

router.post('/recipe/new', (req, res) => {
    recipesService.addRecipe(getRecipeFromForm(req.body));
    res.redirect('/');
});

router.get('/showMore/:id/edit', (req, res) => {
    // crear la clase con la info
    let thisRecipe = recipesService.getRecipe(req.params.id);
    res.render('edit_recipe', thisRecipe);
});

router.post('/showMore/:id/edit', (req, res) => {
    recipesService.editRecipe(req.params.id, getRecipeFromForm(req.body));
    res.redirect('/');
});


export default router;