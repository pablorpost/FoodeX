//constante de recetas que se añadirán cada vez que se pulse el botón de cargar más recetas
const NUM_RESULTS = 5 ;
//variable que se incrementará cada vez que se carguen más recetas 
let loadMoreRequests = 0;

// AJAX de la vista de recetas del index
async function loadMoreRecipes(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    //selecciona la ruta de añadir más recetas y le pasa el rango
    const response = await fetch(`/moreRecipes?from=${from}&to=${to}`);
    //recibe las recetas a añadir
    const newRecipes = await response.text();
    const recipesDiv = document.getElementById("main");
    recipesDiv.innerHTML += newRecipes;
    loadMoreRequests++;
}

//inicializamos el número de subelementos 
let add_ingredients_number = 0;
let add_steps_number = 0;
let add_photo_number = 0;

//añadimos funcionalidad a los botones de borrar subelementos
//borrar ingrediente
function delIngredientBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar este ingrediente?") == true){
        $('#ingredientinpli-' + idNumber).remove()
    }
}
//borrar paso
function delStepBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar este paso?") == true){
        $('#stepinpli-' + idNumber).remove()
    }
}
//borrar imagen
function delImgBtn (idNumber) {
    if (confirm("¿Seguro que quieres borrar esta imagen?") == true){
        $('#imageinpli-' + idNumber).remove()
    }
}

//añadimos funcionalidad a los botones de añadir subelementos
//botón añadir ingrediente
function newIngredient(){
    newIngredientInp('',add_ingredients_number)
    add_ingredients_number++
}
//botón añadir paso
function newStep(){
    newStepInp('', add_steps_number)
    add_steps_number++
}
//botón añadir imagen
function newImage(){
    newImageInp(add_photo_number)
    add_photo_number++
}

// crear el html de un nuevo campo de los ingredientes
function newIngredientInp(innerText, idNumber){
    $("#ingredients_list").append(`
        <li id = 'ingredientinpli-` + idNumber + `'>
            <input name = "ingred" id='ingredientinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-ingredients-` + idNumber + `'  type="button" class="btn btn-danger btn-remove" onclick="delIngredientBtn(${idNumber})">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`);
}

// crear el html de un nuevo campo de las imagenes
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
    $("#prep_list").append(`
        <li id = 'stepinpli-`+idNumber + `'>
            <input name = "steps" id='stepinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-steps-` + idNumber + `' type="button" class="btn btn-danger btn-remove" onclick="delStepBtn(${idNumber})">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`);
}

