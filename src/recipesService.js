const recipes = new Map();
let nextId = 0;

//addPost({ user: "Pepe", title: "Vendo moto", text: "Barata, barata" });

// Lista predefinida de recetas
let predefinedRecipes = [
    ['Arroz con Leche', 'Postre consistente de arroz cocinado en leche', ['/Resources/arrozConLeche1.jpg', '/Resources/arrozConLeche2.jpg', '/Resources/arrozConLeche3.jpg'],
        ['1 litro de Leche', '3 cucharadas de arroz', '4 cucharadas de Azúcar', 'Piel de ¼ de limón', 'Canela en rama'],
        ['Ponemos todos los ingredientes a hervir','Movemos continuamente durante 40 min']],

    ['Bizcocho de Yogurt', 'Esponjoso postre realizado a base de yogurt', ['/Resources/bizcochoDeYogurt1.jpg', '/Resources/bizcochoDeYogurt2.jpg', '/Resources/bizcochoDeYogurt3.jpg'],
        ['1 yogurt de limón', '½ medida de aceite', '2 medidas de azúcar', '3 medidas de harina', '4 huevos', '½ sobre de levadura', 'Sal'],
        ['Se baten los huevos con sal.', 'Se añade el yogurt, el aceite y el azúcar.', 'Se añade la harina y la levadura.',
            'Hornear a 175 ºC durante 20 min.']],

    ['Tortitas', 'Delicioso desayuno, ideal para los domingos', ['/Resources/tortitas1.jpg', '/Resources/tortitas2.jpg'],
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

export function getRecipes(){
    if (recipes.size===0){
        // Añadir las recetas predeterminadas como objetos en la lista de objetos
        console.log("Recetas predefinidas añadidas\n")
        for (const i of predefinedRecipes) {
            addRecipe(i)
        }
    }
    console.log("Recetas:"); for (const i of recipes.values()) {console.log("    "+i.getName())}console.log("")
    let recipesArrayOfClass = new Array()
    let recipesArray = [...recipes]
    for (let i = 0; i < recipesArray.length; i++) {
        recipesArrayOfClass[i] = { 
            id: recipesArray[i][0], 
            image: recipesArray[i][1].getImages()[0],
            name: recipesArray[i][1].getName(),
            description: recipesArray[i][1].getDescription()
        };
    }
    console.log(recipesArrayOfClass)
    return recipesArrayOfClass
}

export function getRecipe(i){
    let thisRecipe = recipes.get(i.toString())
    console.log(thisRecipe)

    let imagesArray = thisRecipe.getImages()
    let imagesArrayClass = new Array()
    for (let i = 0; i < imagesArray.length; i++) {
        imagesArrayClass[i] = {image: imagesArray[i]}
    }

    let igredientsArray = thisRecipe.getIngredients()
    let igredientsArrayClass = new Array()
    for (let i = 0; i < igredientsArray.length; i++) {
        igredientsArrayClass[i] = {igredient: igredientsArray[i]}
    }
    console.log('jhkdbachkijsd ihvboujsaojulvb losjdb')
    console.log(igredientsArray)
    console.log(igredientsArrayClass)

    let preparationsArray = thisRecipe.getPreparation()
    let preparationsArrayClass = new Array()
    for (let i = 0; i < preparationsArray.length; i++) {
        preparationsArrayClass[i] = {preparation: preparationsArray[i]}
    }

    let recipeClass = {
        id: i.toString(),
        name: thisRecipe.getName(),
        description: thisRecipe.getDescription(),
        images: imagesArrayClass,
        ingredients: igredientsArrayClass,
        preparations: preparationsArrayClass
    };
    return recipeClass
}



// declarar variables auxiliares
let add_steps_number = 0 // numero de pasos en la edición o el añadido de una receta
let add_ingredients_number = 0 // numero de ingredientes en la edición o el añadido de una receta
let add_photo_number = 0 // numero de fotos en el añadido de una receta
let idToModify = 0 // saber el id de la receta que deseamos modificar
let newPhotos = new Array() // lista que almacena las rutas de las imagenes que añadimos en una receta

// Añade una receta a la lista de objetos receta
export function addRecipe(recipe) {
    let newRecipe = new Recipe(recipe)
    recipes.set(nextId.toString(), newRecipe);
    return nextId++
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