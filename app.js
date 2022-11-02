//esto es una prueba

// Lista predefinida de 

let predefinedRecipes = [
    ['Arroz con Leche', '', '',
        ['1 litro de Leche', '3 cucharadas de arroz', '4 cucharadas de Azúcar', 'Piel de ¼ de limón', 'Canela en rama'],
        'Se hierve todo junto lentamente moviendo continuamente durante 40 min.'],

    ['Bizcocho de Yogurt', '', '',
        ['1 yogurt de limón', '½ medida de aceite', '2 medidas de azúcar', '3 medidas de harina', '4 huevos', '½ sobre de levadura', 'Sal'],
        `Se baten los huevos con sal.
    Se añade el yogurt, el aceite y el azúcar.
    Se añade la harina y la levadura.
    
    Hornear a 175 ºC durante 20 min.`],

    ['Tortitas', '', '',
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
    image = ''
    ingredients = new Array()
    preparation = ''

    constructor(datos) {
        if (datos[0]) { this.name = datos[0] }
        if (datos[1]) { this.description = datos[1] }
        if (datos[2]) { this.image = datos[2] }
        if (datos[3]) { this.ingredients = datos[3] }
        if (datos[4]) { this.preparation = datos[4] }
    }
}

recipe = new Array()

function addRecipe(recipe) {
    let newRecipe = new Receta(recipe)
    recipe.push(newRecipe)
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
for (let recipe of predefinedRecipes){
    addRecipe(recipe)
}
