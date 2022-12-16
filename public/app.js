let loadMoreIngredientsRequests = 0;

async function loadMoreIngredients(){

    const response = await fetch(`/newIngredient`);

    const newIngredient = await response.text();
  
    const ingredientsUl = document.getElementById("lista_ingredientes");

    ingredientsUl.innerHTML += newIngredient;

    loadMoreIngredientsRequests++;
}

