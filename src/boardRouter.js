import express from 'express';
import * as recipesService from './recipesService.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("\ntpm\n")
    res.render('index', { 
        recipes: recipesService.getRecipes(0,1),
    });
});

router.get('/showMore/:id', (req, res) => {

    console.log(req.params.id)
    let recipe = recipesService.getRecipe(req.params.id);
    console.log(recipe)

    res.render('show_recipe', recipe);
});

router.get('/showMore/:id/delete', (req, res) => {
    ////if (prop.confirm("¿Seguro que quieres borrar la receta?") == true){}
    recipesService.deleteRecipe(req.params.id)
    res.redirect('/')
});

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

router.get('/add', (req, res) => {
    res.render('add',{ 
        recipe: recipesService.getEmptyRecipe()
    });
});




router.post('/add/add', (req, res) => {
    let {recipeName, recipeDescription , recipeSteps , recipeIngredients, recipePhotos} = req.body;
    boardService.addRecipe({recipeName, recipeDescription , recipePhotos, recipeIngredients, recipeSteps  });
    res.redirect('/');
});


router.get('/newIngredient', (req, res) => {
    console.log("hddddsdsdsdsdsdsdsdsds");
    res.render('newIngredient', {
        ingredients: [{ingredient:""}]
    });
});


router.get('/', (req, res) => {
    res.render('index', {
    posts: boardService.getPosts()
    });
    });

router.post('/add/formulario', (req, res) => {
    console.log(req.body);
    let { user, title, text } = req.body;
    boardService.addPost({ user, title, text });

});

router.get('/newIngredient', (req, res) => {
    console.log("hddddsdsdsdsdsdsdsdsds");
    res.render('newIngredient', {
        ingredients: [{ingredient:""}]
    });
});

router.get('/', (req, res) => {
    res.render('index', {
    posts: boardService.getPosts()
    });
    });

router.post('/add/formulario', (req, res) => {
    console.log(req.body);
    let { user, title, text } = req.body;
    boardService.addPost({ user, title, text });

});

router.get('/morerecipes',(req,res) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const superheroes = getSuperheroes(from,to);

    res.render('superheroes', {
        superheroes: superheroes
    });
    res.redirect('/')
});

export default router;