const NUM_RESULTS = 1 ;
let loadMoreRequests = 0;
let loadMoreIngredientsRequests = 0;

async function loadMoreIngredients(){

    console.log("ouhdsihiuvhocfdnjdvgfbniedfnwsea");
    const response = await fetch(`/newIngredient`);

    const newIngredient = await response.text();
    console.log(newIngredient);
    const ingredientsUl = document.getElementById("lista_ingredientes");

    ingredientsUl.innerHTML += newIngredient;

    loadMoreIngredientsRequests++;
}

async function loadMoreRecipes(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    const response = await fetch(`/moreRecipes?from=${from}&to=${to}`);
    const newRecipes = await response.text();
    const recipesDiv = document.getElementById("main");
    recipesDiv.innerHTML += newRecipes;
    loadMoreRequests++;
}