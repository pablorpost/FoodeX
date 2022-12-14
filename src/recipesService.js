const recipes = new Map();
let nextId = 0;

//addPost({ user: "Pepe", title: "Vendo moto", text: "Barata, barata" });

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

// declarar variables auxiliares
let add_steps_number = 0 // numero de pasos en la edición o el añadido de una receta
let add_ingredients_number = 0 // numero de ingredientes en la edición o el añadido de una receta
let add_photo_number = 0 // numero de fotos en el añadido de una receta
let idToModify = 0 // saber el id de la receta que deseamos modificar
let newPhotos = new Array() // lista que almacena las rutas de las imagenes que añadimos en una receta

// Añade una receta a la lista de objetos receta
export function addRecipe(id, recipe) {
    if (id === 'next'){
        id = nextId
    }
    let newRecipe = new Recipe(recipe)
    recipes.set(id.toString(), newRecipe);
    return nextId++
}

// Añadir las recetas predeterminadas como objetos en la lista de objetos
for (const i of predefinedRecipes) {
    addRecipe('next', i)
}