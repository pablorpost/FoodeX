// Lista predefinida de 
let predefinedRecipes = [
    ['Arroz con Leche', '', ['Resources/arrozConLeche1.jpg', 'Resources/arrozConLeche2.jpg', 'Resources/arrozConLeche3.jpg'],
        ['1 litro de Leche', '3 cucharadas de arroz', '4 cucharadas de Azúcar', 'Piel de ¼ de limón', 'Canela en rama'],
        'Se hierve todo junto lentamente moviendo continuamente durante 40 min.'],

    ['Bizcocho de Yogurt', '', ['Resources/bizcochoDeYogurt1.jpg', 'Resources/bizcochoDeYogurt2.jpg', 'Resources/bizcochoDeYogurt3.jpg'],
        ['1 yogurt de limón', '½ medida de aceite', '2 medidas de azúcar', '3 medidas de harina', '4 huevos', '½ sobre de levadura', 'Sal'],
        `Se baten los huevos con sal.
    Se añade el yogurt, el aceite y el azúcar.
    Se añade la harina y la levadura.
    
    Hornear a 175 ºC durante 20 min.`],

    ['Tortitas', '', ['Resources/tortitas1.jpg', 'Resources/tortitas2.jpg'],
        ['2 huevos', '1 cucharada de azúcar', '1 cucharada de aceite', '1,5 vasos de leche', '200 gr de harina (6 cucharadas grandes)', 'Levadura', 'Sal'],
        `Se baten los huevos con sal.
    Se añade el azúcar, el aceite y la leche y se bate.
    Se añade la harina y la levadura y se bate.
    
    Reposar 15 min.`]

]

class Recipe {
    name = ''
    description = ''
    images = new Array()
    ingredients = new Array()
    preparation = ''
    constructor(datos) {
        if (datos[0]) { this.name = datos[0] }
        if (datos[1]) { this.description = datos[1] }
        if (datos[2]) { this.images = datos[2] }
        if (datos[3]) { this.ingredients = datos[3] }
        if (datos[4]) { this.preparation = datos[4] }
    }
    getName(){
        return this.name
    }
    setName(name){
        this.name = name
    }
    getDescription(){
        return this.description
    }
    setDescription(description){
        this.description = description
    }
    getImages(){
        return this.images
    }
    setImages(images){
        this.images = images
    }
    getIngredients(){
        return this.ingredients
    }
    setIngredients(ingredients){
        this.ingredients = ingredients
    }
    getPreparation(){
        return this.preparation
    }
    setPreparation(preparation){
        this.preparation = preparation
    }
}

recipes = new Array()
function addRecipe(recipe) {
    let newRecipe = new Recipe(recipe)
    recipes.push(newRecipe)
}
for (let recipe of predefinedRecipes) {
    addRecipe(recipe)
}

$(document).ready(function(){
    $("#vista_receta").hide();
    $("#add").hide();
    for (let i=0; i<recipes.length; i++) {
        $("#main").append(generateRecipe(i));
    }
    
});

$(function () {
    $("#btn-back").click(function (){
        $("#main").show();
        $("#buttons").show();
        $("#vista_receta").hide();
    });
    $("#btn-back2").click(function (){
        $("#main").show();
        $("#buttons").show();
        $("#add").hide();
    });
    i=3
    $("#btn-add2").click(function (){
        $("#main").append(generateRecipe(i));
        i+=1
    });
    $("#btn-add").click(function (){
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").hide();
        $("#add").show();
    });
    $("#btn-addsteps").click(function (){
        $("#preparacion_input").append("<input id='stepinp' type='text'><br>");
    });
    $("#btn-addingredients").click(function (){
        $("#ingredientes_input").append("<input id='ingredientinp' type='text'><br>");
    });
})

function generateRecipe(i){
    return`
    <div id="del`+ i+`" class="card" style="width: 30rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">`+recipes[i].getName()+`</h5>
            <p class="card-text">`+recipes[i].getDescription()+`</p>
            <a href="#" id="btn-show`+i+`" class="btn btn-primary">Go somewhere</a>
            <button id="btn-del`+i+`"" class="btn btn-primary">Del</button>
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

function showmore(recipe_id){
    jQuery(function($) {
        $("#main").hide();
        $("#buttons").hide();
        $("#vista_receta").show();
        ingredients="<ul>"
        images=""
        n=0
        for (let image of recipes[recipe_id].getImages()){
            images += "<img src="+image+" alt="+recipes[recipe_id].getName()+n+" class='img-responsive' height='450px' width='450px'></img>";
            n+=1
        }
        for (let ingredient of recipes[recipe_id].getIngredients()){
            ingredients += '<li type="circle">'+ ingredient +"</li>";
            n+=1
        }
        ingredients += "</ul>"
        $("#vista_receta_cont").html('<p class="card-text"> Descripcion: '+ recipes[recipe_id].getDescription()+' </p>'
                                    + images+
                                    '<p> Ingredientes:  '+ ingredients+' </p>'+
                                    '<p> Preparacion: '+ recipes[recipe_id].getPreparation());
        $("#vista_receta_tit").text("Receta: "+ recipes[recipe_id].getName());
})};