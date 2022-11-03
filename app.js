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

//let content = document.getElementById('content');

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
        return this.image
    }
    setImages(image){
        this.image = image
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

function deleteRecipe(nameRecipe) {
    /*
    let element = document.getElementById('div-' + nameRecipe);
    element.remove();*/
}

function recipeToHTML(recipe) {
    /*
    let div = document.createElement("div");
    content.appendChild(div);
    div.id = 'div-' + i;

    let pTitulo = document.createElement("p");
    div.appendChild(pTitulo);

    pTitulo.textContent = recipe.name;

    let recipe_info = document.createElement("button");
    pTitulo.appendChild(recipe_info);
    recipe_info.textContent = "Más info";
    recipe_info.onclick = () => showHideMasInfo(i);

    let deleteb = document.createElement("button");
    pTitulo.appendChild(deleteb);
    deleteb.textContent = "Borrar";
    deleteb.onclick = () => deletee(i);*/


}

//cargar las recetas predefinidas en el array recetas, detnro de objetos del tipo Receta
for (let recipe of predefinedRecipes) {
    addRecipe(recipe)
}
console.log(recipes)

$(document).ready(function(){
    $("#vista_receta").hide();
});

$(function () {
    $("#btn-show").click(function (){
        $("#main").hide();
        $("#vista_receta").show();
        recipe_id=0
        images=""
        n=0
        for (let image of recipes[recipe_id].getIngredients()){
            images += "<img src="+image+" alt="+recipes[recipe_id].getName()+n+"></img>";
            n+=1
        }
        $("#vista_receta_cont").html(`<p class="card-text"> Descripcion: `+ recipes[recipe_id].getDescription()+` </p>
                                    <p> Ingredientes:  `+ recipes[recipe_id].getIngredients()+` </p>
                                    `+ images+`
                                    
                                    
                                    
                                    
                                    `); // , "Descripcion de la receta" , "image", "indegradiente, prep"
        $("#vista_receta_tit").text("Receta: "+ recipes[recipe_id].getName());
    });
    $("#btn-back").click(function (){
        $("#main").show();
        $("#vista_receta").hide();
    });
})
