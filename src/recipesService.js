const recipes = new Map();
let nextId = 0;

// Lista predefinida de recetas
let predefinedRecipes = [
    ['Arroz con Leche', 'Postre consistente de arroz cocinado en leche', new Map([[0,'/Resources/arrozConLeche1.jpg'], [1,'/Resources/arrozConLeche2.jpg'], [2,'/Resources/arrozConLeche3.jpg']]),
    new Map([[0,'1 litro de Leche'],[1,'3 cucharadas de arroz'],[2,'4 cucharadas de Azúcar'],[3,'Piel de ¼ de limón'],[4,'Canela en rama']]),
    new Map([[0,'Ponemos todos los ingredientes a hervir'],[1,'Movemos continuamente durante 40 min']])],

    ['Bizcocho de Yogurt', 'Esponjoso postre realizado a base de yogurt', new Map([[0,'/Resources/bizcochoDeYogurt1.jpg'],[1,'/Resources/bizcochoDeYogurt2.jpg'],[2,'/Resources/bizcochoDeYogurt3.jpg']]),
    new Map([[0,'1 yogurt de limón'],[1,'½ medida de aceite'],[2,'2 medidas de azúcar'],[3,'3 medidas de harina'],[4,'4 huevos'],[5,'½ sobre de levadura'],[6,'Sal']]),
    new Map([[0,'Se baten los huevos con sal.'],[1,'Se añade el yogurt, el aceite y el azúcar.'],[2,'Se añade la harina y la levadura.'],[3,'Hornear a 175 ºC durante 20 min.']])],

    ['Tortitas', 'Delicioso desayuno, ideal para los domingos', new Map([[0,'/Resources/tortitas1.jpg'],[1,'/Resources/tortitas2.jpg']]),
    new Map([[0,'2 huevos'],[1,'1 cucharada de azúcar'],[2,'1 cucharada de aceite'],[3,'1,5 vasos de leche'],[4,'200 gr de harina (6 cucharadas grandes)'],[5,'Levadura'],[6,'Sal']]),
    new Map([[0,'Se baten los huevos con sal.'],[1,'Se añade el yogurt, el aceite y el azúcar.'],[2,'Se añade la harina y la levadura.'],[3,'Hornear a 175 ºC durante 20 min.']])]
]

// Objeto receta que almacena los datos de una receta con geters y setters
class Recipe {
    name = ''
    description = ''
    images = new Map()
    ingredients = new Map()
    preparation = new Map()

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

    getImages = () => [...this.images]
    setImages = images => this.images = images

    getIngredients = () => [...this.ingredients]
    setIngredients = ingredients => this.ingredients = ingredients

    getPreparation = () => [...this.preparation]
    setPreparation = preparation => this.preparation = preparation

    equals(r2){
        //el comparador esta diseñado de tal manera que hace los procesos mas rapidos primero, para evitar computacion innecesaria,
        //en caso de que se pueda finalizar la comparacion rapidamente
        if ((this.name!=r2.getName()) || (this.description != r2.getName())){return false}

        image1 = this.getImages()
        image2 = r2.getImages()
        ingredient1 = this.getIngredients()
        ingredient2 = r2.getIngredients()
        preparation1 = this.getPreparation()
        preparation2 = r2.getPreparation()

        if ((image1.length != image2.length) || (ingredient1.length != ingredient2.length) || (preparation1.length != preparation2.length)){return false}

        for (let i = 0; i < image1.length; i++){if(image1[i][1]!=image2[i][1]){return false}} 
        for (let i = 0; i < ingredient1.length; i++){if(ingredient1[i][1]!=image2[i][1]){return false}} 
        for (let i = 0; i < preparation1.length; i++){if(preparation1[i][1]!=preparation2[i][1]){return false}} 

        return true
    }
    
    modifyInto(r2){
        if (this.name!=r2.getName()){
            this.name=r2.getName()
        }
        if (this.description!=r2.getDescription()){
            this.description=r2.getDescription()
        }
        image1 = this.getImages()
        image2 = r2.getImages()
        ingredient1 = this.getIngredients()
        ingredient2 = r2.getIngredients()
        preparation1 = this.getPreparation()
        preparation2 = r2.getPreparation()

        for (let i = 0; i < image2.length; i++){if(image1[i][1]!=image2[i][1]){this.images.set(i,image2[i][1])}} 
        if (image1.length > image2.length){
            for (let i = image2.length; i < image1.length; i++){this.images.delete(i)}
        }
        for (let i = 0; i < ingredient2.length; i++){if(ingredient1[i][1]!=ingredient2[i][1]){this.ingredients.set(i,ingredient2[i][1])}} 
        if (ingredient1.length > ingredient2.length){
            for (let i = ingredient2.length; i < ingredient1.length; i++){this.ingredients.delete(i)}
        }
        for (let i = 0; i < description2.length; i++){if(description1[i][1]!=description2[i][1]){this.description.set(i,description2[i][1])}} 
        if (description1.length > description2.length){
            for (let i = description2.length; i < description1.length; i++){this.description.delete(i)}
        }
    }
}


// Añadir las recetas predeterminadas como objetos en la lista de objetos
let anad = true
function anyadir(){
    if(anad){
        console.log("Recetas predefinidas añadidas\n")
            for (const i of predefinedRecipes) {
                addRecipe(i)
            }
    anad = false
    }
    else{
    console.log("Las recetas borradas, desaparecieron para siempre :´(")
    }
}

export function getRecipes(from, to){
    anyadir()
    console.log("Recetas:"); for (const i of recipes.values()) {console.log("    "+i.getName())}console.log("")
    let recipesArrayOfClass = new Array()
    let recipesArray = [...recipes]
    for (let i = 0; i < recipesArray.length; i++) {
        recipesArrayOfClass[i] = { 
            id: recipesArray[i][0],     
            image: recipesArray[i][1].getImages()[0][1],
            name: recipesArray[i][1].getName(),
            description: recipesArray[i][1].getDescription()
        };
    }
    console.log(recipesArrayOfClass)
    if (from !== undefined) {
        return recipesArrayOfClass.slice(from, to);
    }
    return recipesArrayOfClass
}

export function getRecipe(i){
    let thisRecipe = recipes.get(i.toString())
    console.log(thisRecipe)

    let imagesArray = thisRecipe.getImages()
    let imagesArrayClass = new Array()
    console.log(imagesArray)
    for (let i = 0; i < imagesArray.length; i++) {
        imagesArrayClass[i] = {image: imagesArray[i][1]}
    }
    console.log(imagesArrayClass)

    let igredientsArray = thisRecipe.getIngredients()
    let igredientsArrayClass = new Array()
    for (let i = 0; i < igredientsArray.length; i++) {
        igredientsArrayClass[i] = {id:i, igredient: igredientsArray[i][1]}
    }

    let preparationsArray = thisRecipe.getPreparation()
    let preparationsArrayClass = new Array()
    for (let i = 0; i < preparationsArray.length; i++) {
        preparationsArrayClass[i] = {id:i, preparation: preparationsArray[i][1]}
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


export function deleteRecipe(id){
    recipes.delete(id.toString())
}

export function getEmptyRecipe(){
    let recipeClassEmpty = {
        id: nextId++,
        name: '',
        description: '',
        images: [],
        ingredients: [],
        preparations: []
    };
    return recipeClassEmpty;
}

export function editRecipe(n,classs){
    console.log("/n/n"+n+"/n"+classs+"/n/n")
}

/*
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

                    if (!$('.existingElement').length){
                        $('#noElementsMessage').show()
                    }

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
}                    */
