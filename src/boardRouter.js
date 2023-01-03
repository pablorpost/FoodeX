//importamos el modulo express y todas las funciones del recipeService
import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

//index
router.get('/', (req, res) => {
    res.render('index', { 
        recipes: recipesService.getRecipes(0,5)
    });
});

//mostrar más recetas (las carga con Ajax)
router.get('/moreRecipes', (req, res) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to); 
    res.render('recipesIndex', { 
        recipes: recipesService.getRecipes(from,to)
    });
});

//mostrar receta
router.get('/showMore/:id', (req, res) => {
    let recipe = recipesService.getRecipe(req.params.id);
    res.render('show_recipe', recipe);
});

//una vez mostrada la receta, se le da a eliminar
router.get('/showMore/:id/delete', (req, res) => {
    let recipe = recipesService.getRecipe(req.params.id);
    console.log(recipe)
    res.render('conf', recipe);

});

//confirmación de eliminar
router.get('/showMore/:id/trudelete', (req, res) => {
    recipesService.deleteRecipe(req.params.id)
    res.redirect('/')
});

//recibir los datos del formulario de añadir
router.post('/recipe/new', (req, res) => {
    
    let name = req.body.nombre;
    let description = req.body.description;
    let ingred = req.body.ingred;
    
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

    let steps = req.body.steps;
    let stepMap = new Map();
    sum = 0
    if (steps) {
        for(const l of steps){sum += l.length}
        if (steps.length!=sum) {
            for (let i = 0; i < steps.length; i++) {
                stepMap.set(i, steps[i]);
            }
        } else {
            stepMap.set(0, steps);
        }
    }

    let images = req.body.image;
    let imagesMap = new Map();
    sum = 0;
    if(images){
        for(const l of images){sum += l.length}
        if (images.length!=sum) {
            for (let i = 0; i < images.length; i++) {
                imagesMap.set(i, images[i]);
            }
        } else {
            imagesMap.set(0, images);
        }
    }
    else{
        //cargamos imagen predefinida
        imagesMap.set(0, '/Resources/fotoPredeterminadaDeReceta.jpg');
    }

    recipesService.addRecipe([name, description, imagesMap, ingredMap, stepMap]);
    res.redirect('/');
});

//enviamos a la página con el formulario para editar receta
router.get('/showMore/:id/edit', (req, res) => {
    let thisRecipe = recipesService.getRecipe(req.params.id);
    res.render('edit_recipe', thisRecipe);
});

//recogemos los nuevos datos de la receta
router.post('/showMore/:id/edit', (req, res) => {
    
    let name = req.body.nombre;
    let description = req.body.description;
    let ingred = req.body.ingred;
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

    let steps = req.body.steps;
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
    
    let images = req.body.image;
    let imagesMap = new Map();
    sum = 0;
    if(images){
        for(const l of images){sum += l.length}
        if (images.length!=sum) {
            for (let i = 0; i < images.length; i++) {
                imagesMap.set(i, images[i]);
            }
        } else {
            imagesMap.set(0, images);
        }
    }
    else{
        imagesMap.set(0, '/Resources/fotoPredeterminadaDeReceta.jpg');
    }
    
    recipesService.editRecipe(req.params.id, [name, description, imagesMap, ingredMap, stepMap]);
    res.redirect('/');
});


export default router;