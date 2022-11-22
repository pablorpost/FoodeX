// Lista predefinida de recetas
let predefinedRecipes = [
    ['Arroz con Leche', 'Postre consistente de arroz cocinado en leche', ['Resources/arrozConLeche1.jpg', 'Resources/arrozConLeche2.jpg', 'Resources/arrozConLeche3.jpg'],
        ['1 litro de Leche', '3 cucharadas de arroz', '4 cucharadas de Azúcar', 'Piel de ¼ de limón', 'Canela en rama'],
        ['Ponemos todos los ingredientes a hervir','Movemos continuamente durante 40 min']],

    ['Bizcocho de Yogurt', 'Esponjoso postre realizado a base de yogurt', ['Resources/bizcochoDeYogurt1.jpg', 'Resources/bizcochoDeYogurt2.jpg', 'Resources/bizcochoDeYogurt3.jpg'],
        ['1 yogurt de limón', '½ medida de aceite', '2 medidas de azúcar', '3 medidas de harina', '4 huevos', '½ sobre de levadura', 'Sal'],
        ['Se baten los huevos con sal.', 'Se añade el yogurt, el aceite y el azúcar.', 'Se añade la harina y la levadura.',
            'Hornear a 175 ºC durante 20 min.']],

    ['Tortitas', 'Delicioso desayuno, ideal para los domingos', ['Resources/tortitas1.jpg', 'Resources/tortitas2.jpg'],
        ['2 huevos', '1 cucharada de azúcar', '1 cucharada de aceite', '1,5 vasos de leche', '200 gr de harina (6 cucharadas grandes)', 'Levadura', 'Sal'],
        ['Se baten los huevos con sal.', 'Se añade el azúcar, el aceite y la leche y se bate.', 'Se añade la harina y la levadura y se bate.',
            'Reposar 15 min.']]
]

// Objeto receta que almacena los datos de una receta con geters y setters
class Recipe {
    name = ''
    description = ''
    images = new Array()
    ingredients = new Array()
    preparation = new Array()

    constructor(datos) {
        if (datos[0]) { this.name = datos[0] }
        if (datos[1]) { this.description = datos[1] }
        if (datos[2]) { this.images = datos[2] }
        if (datos[3]) { this.ingredients = datos[3] }
        if (datos[4]) { this.preparation = datos[4] }
    }

    getName = () => this.name
    setName = name => this.name = name

    getDescription = () => this.description
    setDescription = description => this.description = description

    getImages = () => this.images
    setImages = images => this.images = images

    getIngredients = () => this.ingredients
    setIngredients = ingredients => this.ingredients = ingredients

    getPreparation = () => this.preparation
    setPreparation = preparation => this.preparation = preparation
}

let recipes = new Array()

let add_steps_number = 0
let add_ingredients_number = 0
let add_photo_number = 0
let todel = 0
let newphotos = 0
let idNumb = 0

// Añade una reeceta a la lista de objetos receta
function addRecipe(recipe) {
    let newRecipe = new Recipe(recipe)
    recipes.push(newRecipe)
}

// Añadir las recetas predeterminadas como objetos en la lista de objetos
for (let recipe of predefinedRecipes) {
    addRecipe(recipe)
}

// Función para asignar funciones a los botones de mostrar mas info y borrar elementos
function eventFunctionDelShow(){
    $('.btn').on('click', function(event) {
        let nameButtonPressed = event.target.id.split('-')
        let numberOfId = nameButtonPressed[nameButtonPressed.length - 1]
        if (nameButtonPressed[0] == 'btn'){
            if (nameButtonPressed.includes('del')){
                if (confirm("¿Seguro que quieres borrar la receta?") == true){
                    $('#del-' + numberOfId).remove();
                    if (!$('.existingElement').length){
                        $('#noElementsMessage').show()
                    }
                }
            }
            if (nameButtonPressed.includes('show')){
                showmore(numberOfId);
            }
            else if (nameButtonPressed.includes('edit')){
                editrecipe(numberOfId);
            }
            else if (nameButtonPressed.includes('nshowM')){
                $("#main").show();
                $("#buttons").show();
                $("#vista_receta").hide();
            }
            if (nameButtonPressed.includes('nshowA')){
                $("#main").show();
                $("#buttons").show();
                $("#add").hide();
                resetAdd();
            }
        }
    });
}

function newIngredientInp(innerText, idNumber){
    $("#lista_ingredientes").append(`
        <li id = 'ingredientinpli-` + idNumber + `'>
            <input id='ingredientinp-` + idNumber + `' type='text' value = "` + innerText + `">
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

function newStepInp(innerText, idNumber){
    $("#lista_prep").append(`
        <li id = 'stepinpli-` + idNumber + `'>
            <input id='stepinp-` + idNumber + `' type='text' value = "` + innerText + `">
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


function buttonsAddElementsInListAddEdit(){
    
    // Añadir un ingrediente a al nueva receta
    $("#btn-addingredients").click(function () {
        newIngredientInp('',add_ingredients_number)
        add_ingredients_number++
    });
    // Añadir un paso a la nueva receta
    $("#btn-addsteps").click(function () {
        console.log('nuevo paso')
        newStepInp('', add_steps_number)
        add_steps_number++
    });

    $("#btn-addphoto").click(function () {  //añadir una foto a al nueva receta
        $("#image_input").append(`
        <li>
            <input id="inputFileToLoad`+add_photo_number+`" type="file" onchange="encodeImageFileAsURL(`+add_photo_number+`);" />
            <div id="imgTest`+add_photo_number+`"></div>
        </li>`);
        add_photo_number += 1;
    });

        // Añadir receta con datos obtenidos
    $("#btn-new").click(function () {
        let newpasos = new Array
        let newingredients = new Array

        for (let i = 0; i < add_steps_number; i++) {
            if ($("#stepinp-" + i).val()) {
                newpasos.push($("#stepinp-" + i).val());
            }
        }
        for (let i = 0; i < add_ingredients_number; i++) {
            if ($("#ingredientinp-" + i).val()){
                newingredients.push($("#ingredientinp-" + i).val())
            }
        }
        if ($("#tituloadd").html() === 'Modificar receta'){
            console.log('borrar' + todel)
            $('#del-' + todel).remove();
            console.log('bbbbbbbbbbbbbb')
        }
        //si no hay fotos añadir foto predeterminada
        if (!newphotos.length){
            newphotos.push('Resources/logoFondo.jpg')
        }
        addRecipe([$("#tituloinp").val(), $("#descripcioninp").val(), newphotos, newingredients, newpasos]);
        $("#main").append(generateRecipe(recipes.length - 1)); // Añadirla a la vista principal
        
        $("#main").show();
        $("#buttons").show();
        $("#add").hide();
        //$("#tituloinp").val(""); // Resetear valores de entrada para futuros formularios
        //$("#descripcioninp").val("");
        resetAdd()
    });
}

// Se ejecutan al finalizar la carga del html
$(function () {
    // Esconden todas las paginas menos la principal
    $('#noElementsMessage').hide()
    $("#vista_receta").hide();
    $("#add").hide();
    resetAdd();
    // Se añaden las vistas de las recertas predeterminadas
    for (let i = 0; i < recipes.length; i++) {
        $("#main").append(generateRecipe(i));
    }
    // Ir al formulario para añadir una receta
    $("#btn-add").click(function () {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").hide();
        $("#add").show();
        $('#tituloadd').html('A&ntilde;adir nueva receta')
        add_steps_number = 0;               //se inicializan variables para saber cuantos pasos, fotos e
        add_ingredients_number = 0;         //ingredientes habra que añadir
        add_photo_number = 1;
        newphotos = new Array
    });
    // dar valor a los botones creados
    eventFunctionDelShow();
});

//enseñar la pagina formulario rellanada con los datos de la receta a modificar
function editrecipe(recipe_id){
    $("#main").hide();
    $("#buttons").hide();
    $("#vista_receta").hide();
    $("#add").show();
    $("#tituloadd").html('Modificar receta')
    $("#btn-addphoto").hide()
    $("#image_input").hide()
    newphotos = recipes[recipe_id].getImages();
    $("#tituloinp").val(recipes[recipe_id].getName());
    $("#descripcioninp").val(recipes[recipe_id].getDescription());

    add_ingredients_number = recipes[recipe_id].getIngredients().length
    add_steps_number = recipes[recipe_id].getPreparation().length

    let ingredientsArray = recipes[recipe_id].getIngredients()
    let preparationArray = recipes[recipe_id].getPreparation()
    
    for (let i = 0; i < ingredientsArray.length; i++) {
        newIngredientInp(ingredientsArray[i], i)
    }
    for (let i = 0; i < preparationArray.length; i++) {
        newStepInp(preparationArray[i], i)
    }
    $("#notImageEditMessage").html("<strong>New photos cannot be added</strong>")
    $("#btn-new").html("Aplicar cambios")
    todel = recipe_id
}

// Generar la carta de una receta, sus botones, ver mas y borrar, además de las funciones asociadas a ellos
function generateRecipe(i){   
    $('#noElementsMessage').hide()
    return`
    <div id="del-` + i + `" class="col mb-5 existingElement">                   
        <div class="card">
            <img src="` + recipes[i].getImages()[0] + `" class="card-img-top" alt="` + recipes[i].getName() + ` photo">
            <div class="card-body">
                <h3 class="card-title"><strong>` + recipes[i].getName() + `</strong></h3>
                <h6 class="card-text">` + recipes[i].getDescription() + `</h6>
                <a href="#" id="btn-show-` + i + `" class="btn btn-primary">Ver receta</a>
            </div>
        </div>
    </div>    
`}



// Generar la pagina de vista de la información completa de la receta, agrupando fotos, imagenes y pasos
function showmore(recipe_id) {
    jQuery(function ($) {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").show();
        ingredients = "<ul>" //principio lista sin orden
        prepar = "<ol>"      //principio lista ordenada
        images = ""
        n = 0
        // Agrupar direcciones de fotos
        for (let image of recipes[recipe_id].getImages()) {
            images += "<img src=" + image + " alt=" + recipes[recipe_id].getName() + ' photo ' + n + " class='img-responsive' height='450px' width='450px'></img>";
            console.log("imagen")
            n += 1
        }
        // Lista punteada ingredientes
        for (let ingredient of recipes[recipe_id].getIngredients()) {

            ingredients += '<li type="circle">' + ingredient + "</li>";
        }
        // Lista numerada pasos
        for (let step of recipes[recipe_id].getPreparation()) {
            prepar += '<li>' + step + "</li>";
        }
        ingredients += "</ul>" // Final de la lista sin orden
        prepar += "</ol>"  // Final de la lista ordenada
        // Montar final
        $("#vista_receta_tit").text("Receta: "+ recipes[recipe_id].getName());
        $("#vista_receta_gallery").html(images);
        $("#vista_receta_cont").html('<h2 class="description"> Descripcion: ' + recipes[recipe_id].getDescription() + ' </h2>'+
                                    '<div class="listContent">' +
                                        '<div class="list">' +
                                            '<h3 class="ingredientsTitle"> Ingredientes:  </h3>' +'<h6 class="ingredientsContent">' + ingredients + ' </h6>' +
                                        '</div>' +
                                        '<div class="list">' + 
                                            '<h3 class="preparationTitle"> Preparacion: </h3>'  +'<h6 class="preparationContent">'+ prepar + ' </h3>' +
                                        '</div>' +
                                    '</div>');
        $("#vista_recta_buttons").html('<button id="btn-nshowM" class="btn btn-primary">Volver</button>' +
                                        '<button id="btn-edit-' + recipe_id + '" class="btn btn-primary">Editar</button>' +
                                        '<button id="btn-del-nshowM-' + recipe_id + '" class="btn btn-primary">Borrar</button>');
        eventFunctionDelShow();
})};

function encodeImageFileAsURL(i) {
    let filesSelected = document.getElementById("inputFileToLoad"+i).files;    
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];

        let fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result; // <--- data: base64

            let newImage = document.createElement('img');
            newImage.src = srcData;
            newphotos[add_photo_number - 1] = srcData; // Añadir elemento al array

            document.getElementById("imgTest"+i).innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

//resetea el add
function resetAdd(){
    $("#add").html(`
        <div class="col">
            <div class="card">
                <br>
                <div class="card-body">
                    <h5  class="card-title"><strong id="tituloadd"></strong></h5>
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
                        <button id="btn-nshowA" class="btn btn-primary">Volver</button>
                    </div>
                    <br><br><br>
                </div>
            </div>
        </div>
    `)
    buttonsAddElementsInListAddEdit();
    eventFunctionDelShow();
}