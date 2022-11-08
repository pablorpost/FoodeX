// Lista predefinida de recetas
let predefinedRecipes = [
    ['Arroz con Leche', 'Postre consistente de arroz cocinado en leche', ['Resources/arrozConLeche1.jpg', 'Resources/arrozConLeche2.jpg', 'Resources/arrozConLeche3.jpg'],
        ['1 litro de Leche', '3 cucharadas de arroz', '4 cucharadas de Azúcar', 'Piel de ¼ de limón', 'Canela en rama'],
        ['Se hierve todo junto lentamente moviendo continuamente durante 40 min.']],

    ['Bizcocho de Yogurt', 'Esponjoso postre realizado a base de yogurt', ['Resources/bizcochoDeYogurt1.jpg', 'Resources/bizcochoDeYogurt2.jpg', 'Resources/bizcochoDeYogurt3.jpg'],
        ['1 yogurt de limón', '½ medida de aceite', '2 medidas de azúcar', '3 medidas de harina', '4 huevos', '½ sobre de levadura', 'Sal'],
        ['Se baten los huevos con sal.','Se añade el yogurt, el aceite y el azúcar.','Se añade la harina y la levadura.',
        'Hornear a 175 ºC durante 20 min.']],

    ['Tortitas', 'Delicioso desayuno, ideal para los domingos', ['Resources/tortitas1.jpg', 'Resources/tortitas2.jpg'],
        ['2 huevos', '1 cucharada de azúcar', '1 cucharada de aceite', '1,5 vasos de leche', '200 gr de harina (6 cucharadas grandes)', 'Levadura', 'Sal'],
        ['Se baten los huevos con sal.','Se añade el azúcar, el aceite y la leche y se bate.','Se añade la harina y la levadura y se bate.',
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

recipes = new Array()

// Añade una reeceta a la lista de objetos receta
function addRecipe(recipe) {
    let newRecipe = new Recipe(recipe)
    recipes.push(newRecipe)
}

// Añadir las recetas predeterminadas como objetos en la lista de objetos
for (let recipe of predefinedRecipes) {
    addRecipe(recipe)
}

// cuando el documento acaba de cargarse se esconden todas las paginas 
// menos la principal y se añaden las vistas de las recertas predeterminadas
$(document).ready(function(){
    $("#vista_receta").hide();
    $("#add").hide();
    for (let i=0; i<recipes.length; i++) {
        $("#main").append(generateRecipe(i));
    }

});

$(function () {
    //volver de vista receta activando la pagina principal y los botones
    $("#btn-back").click(function (){ 
        $("#main").show();
        $("#buttons").show();
        $("#vista_receta").hide();
    });
    // volver de add receta activando la pagina principal y los botones
    $("#btn-back2").click(function (){ 
        $("#main").show();
        $("#buttons").show();
        $("#add").hide();
    });

    // Id de las recetas añadidas después
    i = predefinedRecipes.length
    // Añadir receta con datos obtenidos
    $("#btn-new").click(function (){  
        addRecipe([$("#tituloinp").val(),"",[],[],]);
        $("#main").append(generateRecipe(i)); // Añadirla a la vista principal
        i+=1  // Id de receta
        $("#main").show();
        $("#buttons").show();
        $("#add").hide();
        $("#tituloinp").val(""); // Resetear valores de entrada para futuros formularios
    });
    // Ir al formulario para añadir una receta
    $("#btn-add").click(function (){ 
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").hide();
        $("#add").show();
        add_steps_number = 0;               //se inicializan variables para saber cuantos pasos, fotos e
        add_ingredients_number = 0;         //ingredientes habra que añadir
        add_photo_number = 1;
    });
    // Añadir un paso a la nueva receta
    $("#btn-addsteps").click(function (){ 
        $("#lista_prep").append("<li><input id='stepinp"+ add_steps_number +"' type='text'></li><br>");
        add_steps_number += 1;
    });
    // Añadir un ingrediente a al nueva receta
    $("#btn-addingredients").click(function (){  
        $("#lista_ingredientes").append("<li><input id='ingredientinp"+ add_ingredients_number +"' type='text'></li><br>");
        add_ingredients_number += 1;
    });
    $("#btn-addphoto").click(function (){  //añadir una foto a al nueva receta
        $("#image_input").append('<li><input id="image'+add_photo_number+'" type="file" accept="image/" name="image"></li>');
        add_photo_number += 1;
    });
})

// Generar la carta de una receta, sus botones, ver mas y borrar, además de las funciones asociadas a ellos
function generateRecipe(i){   
    return`                   

    <div id="del`+ i+`" class="item">
        <div class="card" style="width: 30rem;">
            <img src="`+recipes[i].getImages()[0]+`" class="card-img-top img-responsive center" alt="`+recipes[i].getName()+` photo">
            <div class="card-body">
                <h5 class="card-title"><strong>`+recipes[i].getName()+`</strong></h5>
                <p class="card-text">`+recipes[i].getDescription()+`</p>
                <a href="#" id="btn-show`+i+`" class="btn btn-primary">Ver receta</a>
            <button id="btn-del`+i+`"" class="btn btn-primary">Borrar</button>
            <script>
            $("#btn-del`+i+`").click(function() {
                $("#del`+i+`" ).remove();
                });
            $("#btn-show`+i+`").click(function() {
                showmore(`+i+`);
                });
            </script>
        </div>
    </div>
`}

// Generar la pagina de vista de la información completa de la receta, agrupando fotos, imagenes y pasos
function showmore(recipe_id){   
    jQuery(function($) {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").show();
        ingredients = "<ul>" //principio lista sin orden
        prepar = "<ol>"      //principio lista ordenada
        images = ""
        n = 0
        // Agrupar direcciones de fotos
        for (let image of recipes[recipe_id].getImages()){ 
            images += "<img src=" + image + " alt=" + recipes[recipe_id].getName() + ' photo ' + n + " class='img-responsive' height='450px' width='450px'></img>";
            n += 1
        }
        // Lista punteada ingredientes
        for (let ingredient of recipes[recipe_id].getIngredients()){ 
            ingredients += '<li type="circle">' + ingredient + "</li>";
        }
        // Lista numerada pasos
        for (let step of recipes[recipe_id].getPreparation()){  
            prepar += '<li>'+ step + "</li>";
        }
        ingredients += "</ul>" // Final de la lista sin orden
        prepar += "</ol>"  // Final de la lista ordenada
        // Montar final
        $("#vista_receta_cont").html('<p class="card-text"> Descripcion: ' + recipes[recipe_id].getDescription() + ' </p>' +
                                    images +
                                    '<p> Ingredientes:  ' + ingredients + ' </p>' +
                                    '<p> Preparacion: ' + prepar + ' </p>');
        $("#vista_receta_tit").text("Receta: "+ recipes[recipe_id].getName());
})};