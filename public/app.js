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

