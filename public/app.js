//import * as recipesService from '../src/recipesService.js';

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

// crear el html de un nuevo campo de los ingredientes
function newIngredientInp(innerText, idNumber){
    $("#lista_ingredientes").append(`
        <li id = 'ingredientinpli-` + idNumber + `'>
            <input name = "ingred" id='ingredientinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-ingredients-` + idNumber + `'  type="button" class="btn btn-danger btn-remove">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`).css("color", "black");
    
        $('#button-remove-ingredients-' + idNumber).click(function () {
            if (confirm("¿Seguro que quieres borrar este ingrediente?") == true){
                $('#ingredientinpli-' + idNumber).remove()
            }
        });
}

// crear el html de un nuevo campo de los pasos
function newStepInp(innerText, idNumber){
    $("#lista_prep").append(`
        <li id = 'stepinpli-` + idNumber + `'>
            <input name = "steps" id='stepinp-` + idNumber + `' type='text' value = "` + innerText + `">
            <button id = 'button-remove-steps-` + idNumber + `' type="button" class="btn btn-danger btn-remove">
                <i class="bi bi-trash text-light"></i> Delete 
            </button>
            <br>
        </li>`).css("color", "black");
    
        $('#button-remove-steps-' + idNumber).click(function () {
            if (confirm("¿Seguro que quieres borrar este paso?") == true){
                $('#stepinpli-' + idNumber).remove()
            }
        });
}

function newIngredient(){
    newIngredientInp('',add_ingredients_number)
    add_ingredients_number++
}

function newStep(){
    newStepInp('', add_steps_number)
    add_steps_number++
}

/*
// Función para asignar funcionalidad a los botones de: 
function buttonsAddElementsInListAddEdit(){
    
    // Añadir receta con los datos obtenidos
    $("#btn-new").click(function () {
        let newpasos = new Map()
        let newingredients = new Map()
        let newPhotos = new Map()
        // recoger los pasos del html
        for (let i = 0; i < add_steps_number; i++) {
            if ($("#stepinp-" + i).val()) {
                newpasos.set(i, $("#stepinp-" + i).val());
            }
        }
        // recoger los ingredientes del html
        for (let i = 0; i < add_ingredients_number; i++) {
            if ($("#ingredientinp-" + i).val()){
                newingredients.set(i, $("#ingredientinp-" + i).val())
            }
        }
        
        // si no hay fotos, añadir la foto predeterminada
        if (!newPhotos.size()){
            newPhotos.set(0, 'Resources/fotoPredeterminadaDeReceta.jpg')
        }
        // si proviene del añadir
        let thisId = recipesService.addRecipe([$("#tituloinp").val(), $("#descripcioninp").val(), newPhotos, newingredients, newpasos]);
        // Resetear el añadir receta
        resetAdd()
    });
}
*/
// Para poder utilizar imágenes que se almacenan en la ejecución de la página
/*
function encodeImageFileAsURL(i) {
    let filesSelected = document.getElementById("inputFileToLoad"+i).files;    
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];

        let fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result; // <--- data: base64

            let newImage = document.createElement('img');
            newImage.src = srcData;
            newPhotos[add_photo_number - 1] = srcData; // Añadir elemento al array

            document.getElementById("imgTest"+i).innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}
*/
// resetea el add y restablece las funciones de los botones
function resetAdd(){
    $("#add").html(`
        <div class="col">
            <div class="card">
                <br>
                <div class="card-body">
                    <h5  class="card-title"><strong id="addTitle"></strong></h5>
                    <div>
                        <p>Nombre: <input id='tituloinp' type='text'></p> <!-- Input titulo -->
                        <p>Descripcion: <input id='descripcioninp' type='text'></p> <!-- Input descripcion -->
                        <div id="ingredientes_input">
                            <p>Ingredientes:</p>
                            <ul id="lista_ingredientes"> <!-- Lista sin orden en la que se añadira por jquery los inputs de los ingredientes -->
                            </ul>
                        </div>
                        <button id="btn-addingredients" class="btn btn-primary">A&ntilde;adir ingrediente</button> <!-- Boton para añadir un ingrediente más -->
                        <div id="preparacion_input">
                            <p>Preparacion:</p>
                            <ol id="lista_prep"> <!-- Lista ordenada en la que se añadira por jquery los inputs de los pasos -->
                            </ol>
                        </div>
                        <button id="btn-addsteps" class="btn btn-primary">A&ntilde;adir paso</button> <!-- Boton para añadir un paso más -->
                        <div>
                            <p>Imagenes:</p>
                            <ol id="image_input"> <!-- Lista ordenada en la que se añadira por jquery los inputs de los pasos -->
                                <li><input id="inputFileToLoad0" type="file" onchange="encodeImageFileAsURL(0);"/>
                                <div id="imgTest0"></div></li>
                            </ol>
                        </div>
                        <button id="btn-addphoto" class="btn btn-primary">A&ntilde;adir foto</button> <!-- Boton para añadir una foto más -->
                    </div>
                    <p id="notImageEditMessage"></p>
                    <div class="center centerText">
                        <button id="btn-new" class="btn btn-primary">A&ntilde;adir receta</button>
                        <button id="btn-notShowAdd" class="btn btn-primary">Volver</button>
                    </div>
                    <br><br><br>
                </div>
            </div>
        </div>
    `)
    buttonsAddElementsInListAddEdit();
}