const NUM_RESULTS = 5 ;
let loadMoreRequests = 0;

// AJAX de la vista de recetas del index
async function loadMoreRecipes(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    const response = await fetch(`/moreRecipes?from=${from}&to=${to}`);
    const newRecipes = await response.text();
    const recipesDiv = document.getElementById("main");
    recipesDiv.innerHTML += newRecipes;
    loadMoreRequests++;
}


let add_ingredients_number = 0;
let add_steps_number = 0;
let add_photo_number = 0;

function delIngredientBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar este ingrediente?") == true){
        $('#ingredientinpli-' + idNumber).remove()
    }
}

function delStepBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar este paso?") == true){
        $('#stepinpli-' + idNumber).remove()
    }
}

function delImgBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar esta imagen?") == true){
        $('#imageinpli-' + idNumber).remove()
    }
}

// crear el html de un nuevo campo de los ingredientes
function newIngredientInp(innerText, idNumber){
    $("#lista_ingredientes").append(`
        <li id = 'ingredientinpli-` + idNumber + `'>
            <input name = "ingred" id='ingredientinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-ingredients-` + idNumber + `'  type="button" class="btn btn-danger btn-remove" onclick="delIngredientBtn(${idNumber})">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`);
}

function newImageInp(idNumber){
        $("#list_image").append(`
        <li id = 'imageinpli-` + idNumber + `'>
            <input name = "image" id='imageinp-` + idNumber + `' type='text' value = "` + '' + `">
            <button id = 'button-remove-images-` + idNumber + `'  type="button" class="btn btn-danger btn-remove" onclick="delImgBtn(${idNumber})">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`);
}

// crear el html de un nuevo campo de los pasos
function newStepInp(innerText, idNumber){
    $("#lista_prep").append(`
        <li id = 'stepinpli-`+idNumber + `'>
            <input name = "steps" id='stepinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-steps-` + idNumber + `' type="button" class="btn btn-danger btn-remove" onclick="delStepBtn(${idNumber})>
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`);
}

function newIngredient(){
    newIngredientInp('',add_ingredients_number)
    add_ingredients_number++
}

function newStep(){
    newStepInp('', add_steps_number)
    add_steps_number++
}

function newImage(){
    newImageInp(add_photo_number)
    add_photo_number++
}