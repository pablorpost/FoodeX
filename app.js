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


// lista que almacena los objetos Receta existentes
let recipes = new Map()
// variable auxiliar para saber el id actual y saber el siguiente a añadir
let nextId = 0

// declarar variables auxiliares
let add_steps_number = 0 // numero de pasos en la edición o el añadido de una receta
let add_ingredients_number = 0 // numero de ingredientes en la edición o el añadido de una receta
let add_photo_number = 0 // numero de fotos en el añadido de una receta
let idToModify = 0 // saber el id de la receta que deseamos modificar
let newPhotos = new Array() // lista que almacena las rutas de las imagenes que añadimos en una receta

// Añade una reeceta a la lista de objetos receta
function addRecipe(id, recipe) {
    if (id === 'next'){
        id = nextId
    }
    let newRecipe = new Recipe(recipe)
    recipes.set(id.toString(), newRecipe);
    console.log(recipes)
    return nextId++
}

// Añadir las recetas predeterminadas como objetos en la lista de objetos
for (const i of predefinedRecipes) {
    addRecipe('next', i)
}

// Función para asignar funcionalidad a los botones de: mostrar info, editar, ocultar info y ocultar añadido
function eventFunctionDelShow(){
    // recibir información del boton que ha sido pulsado
    $('.btn').on('click', function(event) {
        // obtenemos la lista de atributos desde el id del boton para saber como actuar
        let nameButtonPressed = event.target.id.split('-')
        // obtener el id de la receta que estamos tratando
        let numberOfId = nameButtonPressed[nameButtonPressed.length - 1]
        if (nameButtonPressed[0] == 'btn'){
            // si se desea eliminar el elemento
            if (nameButtonPressed.includes('del')){
                // mostrar cuadro de diálogo para confirmar el borrado
                if (confirm("¿Seguro que quieres borrar la receta?") == true){
                    // borrar de la vista en HTML
                    $('#del-' + numberOfId).remove();
                    // borrar del Map de elementos
                    recipes.delete(numberOfId.toString())
                    // si no quedan elementos, mostramos el mensaje de No Quedan Elementos
                    if (!recipes.size){
                        $('#noElementsMessage').show()
                    }
                    /*
                    if (!$('.existingElement').length){
                        $('#noElementsMessage').show()
                    }
                    */
                }
            }
            // si se desea mostrar más info 
            if (nameButtonPressed.includes('show')){
                showMore(numberOfId);
            }
            // si se desea editar la receta
            else if (nameButtonPressed.includes('edit')){
                editRecipe(numberOfId);
            }
            // si se desea ocultar el más info de la receta
            else if (nameButtonPressed.includes('notShowRecipeView')){
                $("#main").show();
                $("#buttons").show();
                $("#vista_receta").hide();
            }
            // si se desea ocultar el añadir receta
            if (nameButtonPressed.includes('notShowAdd')){
                $("#main").show();
                $("#buttons").show();
                $("#add").hide();
                resetAdd();
            }
        }
    });
}

// crear el html de un nuevo campo de los ingredientes
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

// crear el html de un nuevo campo de los pasos
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

// Función para asignar funcionalidad a los botones de: 
function buttonsAddElementsInListAddEdit(){
    
    // Añadir un ingrediente a al nueva receta
    $("#btn-addingredients").click(function () {
        newIngredientInp('',add_ingredients_number)
        add_ingredients_number++
    });
    // Añadir un paso a la nueva receta
    $("#btn-addsteps").click(function () {
        newStepInp('', add_steps_number)
        add_steps_number++
    });
    //añadir una foto a al nueva receta
    $("#btn-addphoto").click(function () {  
        $("#image_input").append(`
        <li>
            <input id="inputFileToLoad`+add_photo_number+`" type="file" onchange="encodeImageFileAsURL(`+add_photo_number+`);" />
            <div id="imgTest`+add_photo_number+`"></div>
        </li>`);
        add_photo_number += 1;
    });

    // Añadir receta con los datos obtenidos
    $("#btn-new").click(function () {
        let newpasos = new Array()
        let newingredients = new Array()
        // recoger los pasos del html
        for (let i = 0; i < add_steps_number; i++) {
            if ($("#stepinp-" + i).val()) {
                newpasos.push($("#stepinp-" + i).val());
            }
        }
        // recoger los ingredientes del html
        for (let i = 0; i < add_ingredients_number; i++) {
            if ($("#ingredientinp-" + i).val()){
                newingredients.push($("#ingredientinp-" + i).val())
            }
        }
        // si no hay fotos, añadir la foto predeterminada
        if (!newPhotos.length){
            newPhotos.push('Resources/fotoPredeterminadaDeReceta.jpg')
        }
        // creamos variable auxiliar para almacenar la receta a editar
        let thisRecipe = recipes.get(recipe_id.toString())
        // Comprobar si proviene del editar y no del añadir
        if ($("#addTitle").html() === 'Modificar receta'){
            // guardar en la posicion de la receta a editar la nueva receta editada
            addRecipe(idToModify, [$("#tituloinp").val(), $("#descripcioninp").val(), newPhotos, newingredients, newpasos])
            // cambiar el html
            $("#del-"+idToModify).html(
                `           
                <div class="card">
                    <img src="` + thisRecipe.getImages()[0] + `" class="card-img-top" alt="` + thisRecipe.getName() + ` photo">
                    <div class="card-body">
                        <h3 class="card-title"><strong>` + thisRecipe.getName() + `</strong></h3>
                        <h6 class="card-text">` + thisRecipe.getDescription() + `</h6>
                        <a href="#" id="btn-show-` + idToModify + `" class="btn btn-primary">Ver receta</a>
                    </div>
                </div>
            `)
        }
        // si proviene del añadir
        else{
            let thisId = addRecipe('next', [$("#tituloinp").val(), $("#descripcioninp").val(), newPhotos, newingredients, newpasos]);
            // Añadirla a la vista principal
            $("#main").append(generateRecipe(thisId)); 
        }
        $("#main").show();
        $("#buttons").show();
        $("#add").hide();
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
    for (const i of recipes.keys()) {
        console.log(i)
        $("#main").append(generateRecipe(i));
        
    }
    // Añadir la funcionalidad al boton para ir al formulario y añadir una receta
    $("#btn-add").click(function () {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").hide();
        $("#add").show();
        $('#addTitle').html('A&ntilde;adir nueva receta')
        // reseteear variables auxiliares
        add_steps_number = 0;            
        add_ingredients_number = 0;         
        add_photo_number = 1;
        newPhotos = new Array()
    });
    // dar valor a los botones creados
    eventFunctionDelShow();
});

// enseñar la pagina formulario rellanada con los datos de la receta a modificar
function editRecipe(recipe_id){
    $("#main").hide();
    $("#buttons").hide();
    $("#vista_receta").hide();
    $("#add").show();
    $("#addTitle").html('Modificar receta')
    $("#btn-addphoto").hide()
    $("#image_input").hide()
    // creamos variable auxiliar para almacenar la receta a editar
    let thisRecipe = recipes.get(recipe_id.toString())
    // obtiene las imagenes de la receta a modificar
    newPhotos = thisRecipe.getImages();
    $("#tituloinp").val(thisRecipe.getName());
    $("#descripcioninp").val(thisRecipe.getDescription());
    // alamcena la cantidad de ingredientes
    add_ingredients_number = thisRecipe.getIngredients().length
    // alamcena la cantidad de pasos
    add_steps_number = thisRecipe.getPreparation().length
    // obtiene los ingredientes de la receta a modificar
    let ingredientsArray = thisRecipe.getIngredients()
    // obtiene los pasos de la receta a modificar
    let preparationArray = thisRecipe.getPreparation()
    
    for (let i = 0; i < ingredientsArray.length; i++) {
        newIngredientInp(ingredientsArray[i], i)
    }

    for (let i = 0; i < preparationArray.length; i++) {
        newStepInp(preparationArray[i], i)
    }

    $("#notImageEditMessage").html("<strong>New photos cannot be added</strong>")
    $("#btn-new").html("Aplicar cambios")
    idToModify = recipe_id
}

// Generar la carta de una receta, sus botones, ver mas y borrar
function generateRecipe(i){   
    console.log('jjjjjjjjjj')
    $('#noElementsMessage').hide()
    // creamos variable auxiliar para almacenar la receta a editar
    let thisRecipe = recipes.get(i.toString())
    console.log(thisRecipe)
    return`
    <div id="del-` + i + `" class="col mb-5 existingElement">                   
        <div class="card">
            <img src="` + thisRecipe.getImages()[0] + `" class="card-img-top" alt="` + thisRecipe.getName() + ` photo">
            <div class="card-body">
                <h3 class="card-title"><strong>` + thisRecipe.getName() + `</strong></h3>
                <h6 class="card-text">` + thisRecipe.getDescription() + `</h6>
                <a href="#" id="btn-show-` + i + `" class="btn btn-primary">Ver receta</a>
            </div>
        </div>
    </div>    
`}

// Generar la pagina de vista de la información completa de la receta, agrupando fotos, imagenes y pasos
function showMore(recipe_id) {
    jQuery(function ($) {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").show();
        // principio lista sin orden
        ingredients = "<ul>" 
        // principio lista ordenada
        prepar = "<ol>"      
        images = ""
        n = 0
        // creamos variable auxiliar para almacenar la receta a editar
        let thisRecipe = recipes.get(recipe_id.toString())
        // Agrupar direcciones de fotos
        for (let image of thisRecipe.getImages()) {
            images += "<img src=" + image + " alt=" + thisRecipe.getName() + ' photo ' + n + " class='img-responsive' height='450px' width='450px'></img>";
            n += 1
        }
        // Lista punteada ingredientes
        for (let ingredient of thisRecipe.getIngredients()) {
            ingredients += '<li type="circle">' + ingredient + "</li>";
        }
        // Lista numerada pasos
        for (let step of thisRecipe.getPreparation()) {
            prepar += '<li>' + step + "</li>";
        }
        // Final de la lista sin orden
        ingredients += "</ul>" 
        // Final de la lista ordenada
        prepar += "</ol>"  
        // Montar final
        $("#vista_receta_tit").text("Receta: "+ thisRecipe.getName());
        $("#vista_receta_gallery").html(images);
        $("#vista_receta_cont").html('<h2 class="description"> Descripcion: ' + thisRecipe.getDescription() + ' </h2>'+
                                    '<div class="listContent">' +
                                        '<div class="list">' +
                                            '<h3 class="ingredientsTitle"> Ingredientes:  </h3>' +'<h6 class="ingredientsContent">' + ingredients + ' </h6>' +
                                        '</div>' +
                                        '<div class="list">' + 
                                            '<h3 class="preparationTitle"> Preparacion: </h3>'  +'<h6 class="preparationContent">'+ prepar + ' </h3>' +
                                        '</div>' +
                                    '</div>');
        // Colocar botones
        $("#vista_recta_buttons").html('<button id="btn-notShowRecipeView" class="btn btn-primary">Volver</button>' +
                                        '<button id="btn-edit-' + recipe_id + '" class="btn btn-primary">Editar</button>' +
                                        '<button id="btn-del-notShowRecipeView-' + recipe_id + '" class="btn btn-primary">Borrar</button>');
        // añadir fucionalidad a los botones
        eventFunctionDelShow();
})};

// Para poder utilizar imágenes que se almacenan en la ejecución de la página
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
    eventFunctionDelShow();
}