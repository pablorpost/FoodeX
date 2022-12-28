import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("\ntpm\n")
    res.render('index', { 
        recipes: recipesService.getRecipes(0,1)
    });
});

router.get('/moreRecipes', (req, res) => {
    console.log("\ntpmore\n")
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to); 
    res.render('recetasindex', { 
        recipes: recipesService.getRecipes(from,to)
    });
});

router.get('/showMore/:id', (req, res) => {

    console.log(req.params.id)
    let recipe = recipesService.getRecipe(req.params.id);
    console.log(recipe)

    res.render('show_recipe', recipe);
});

router.get('/showMore/:id/delete', (req, res) => {
    let recipe = recipesService.getRecipe(req.params.id);
    console.log(recipe)

    res.render('conf', recipe);

});

router.get('/showMore/:id/trudelete', (req, res) => {
    ////if (prop.confirm("¿Seguro que quieres borrar la receta?") == true){}
    recipesService.deleteRecipe(req.params.id)
    res.redirect('/')
});
/*
router.get('/showMore/:id/edit', (req, res) => {
    res.render('add',{ 
        recipe: recipesService.getRecipe(req.params.id)
    });
});

router.post('/showMore/:id/edit/add', (req, res) => {
    console.log('------------------------------------------------------------------')
    console.log(req.body);
    let {recipeName, recipeDescription , recipeSteps , recipeIngredients, recipePhotos} = req.body;
    recipesService.editRecipe(req.params.id, {recipeName, recipeDescription , recipePhotos, recipeIngredients, recipeSteps });
    res.redirect('/');
});
*/
router.post('/recipe/new', (req, res) => {
    
    let name = req.body.nombre;
    let description = req.body.description;
    let ingred = req.body.ingred;
    let ingredMap = new Map();
    if (ingred){
    for (let i = 0; i < ingred.length; i++) {
        ingredMap.set(i, ingred[i]);
    }
}

    let steps = req.body.steps;
    let stepMap = new Map();
    if (steps){
    for (let i = 0; i < steps.length; i++) {
        stepMap.set(i, steps[i]);
    }
}
    
    let images = new Map();
    images.set(0, 'Resources/fotoPredeterminadaDeReceta.jpg');
    
    recipesService.addRecipe([name, description, images, ingredMap, stepMap]);
    res.redirect('/');
});


export default router;