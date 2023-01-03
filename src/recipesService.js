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
    new Map([[0,'Se baten los huevos con sal.'],[1,'Se añade el yogurt, el aceite y el azúcar.'],[2,'Se añade la harina y la levadura.'],[3,'Hornear a 175 ºC durante 20 min.']])],

    ['Tarta de Santiago', 'Ideal postre gallego', new Map([[0,'/Resources/tartaDeSantiago2.jpg'],[1,'/Resources/tartaDeSantiago1.jpg']]),
    new Map([[0,'200 gr azúcar glass'],[1,'Piel de 1 limón'],[2,'250 gr de almendra picada'],[3,'3 huevos'],[4,'4 yemas'],[5,'2 cucharadas de mantequilla'],[6,'50 gr de harina'],[7,'Sal'], [8,'•	2 cucharaditas de levadura'] ]),
    new Map([[0,'Moler el azúcar con el limón.'],[1,'Añadir almendra, huevos y mantequilla y batir.'],[2,'Añadir harina, levadura y sal y batir.'],[3,'Hornear a 180 ºC durante 15-20 min.']])],

    ['Gambas Gabardina', 'Un plato que sorprenderá', new Map([[0,'/Resources/gambasGabardina1.jpg'],[1,'/Resources/gambasGabardina2.jpg'], [2, '/Resources/gambasGabardina3.jpg']]),
    new Map([[0,'Gambas cocidas'],[1,'Harina'],[2,'Agua/Leche/Cerveza'],[3,'2 claras a punto de nieve'] ]),
    new Map([[0,'Mezclar la harina y el líquido escogido para crear una masa'],[1,'Mojar las gambas y freír']])],

    ['Tortilla', 'El plato que nunca defrauda', new Map([[0,'/Resources/tortillaDePatatas1.jpg'],[1,'/Resources/tortillaDePatatas2.jpg']]),
    new Map([[0,'1kg de patatas'],[1,'6 huevos'],[2,'sal'],[3,'media cebolla'] ]),
    new Map([[0,'Pelar y picar las patatas'],[1,'Freir las patatas a fuego medio'],[2,'Mezclar las patatas medio fritas con el huevo'],[3,'Poner la masa en la sartén y dar vuelta y vuelta']])],

    ['Pizza', 'Una cena deliciosa', new Map([[0,'/Resources/pizza1.jpg'],[1,'/Resources/pizza2.jpg']]),
    new Map([[0,'masa de pizza'],[1,'tomate frito'],[2,'orégano'],[3,'queso a elegir'],[4,'jamón cocido'],[5,'champiñones']]),
    new Map([[0,'Extender la masa y esparcir de tomate la base'],[1,'Añadir orégano y cubrir la base con queso'],[2,'Añadir el resto de ingredientes'],[3,'Hornear a 180 ºC durante 15-20 min.']])],

    ['Pasta Carbonara', 'Una visita a la rica italia', new Map([[0,'/Resources/carbonara1.jpg'],[1,'/Resources/carbonara2.jpg']]),
    new Map([[0,'Pasta'],[1,'3 yemas'],[2,'100gr de queso Grana Padano'],[3,'150gr de guanciale'],[4,'pimienta']]),
    new Map([[0,'Cocer la pasta'],[1,'Dorar la carne'],[2,'Mezclar las yemas con el queso'],[3,'Juntar todas las elaboraciones y batir junto con el agua de la pasta']])],

    ['Pasta al pesto', 'Una visita a la rica italia', new Map([[0,'/Resources/pesto1.jpg']]),
    new Map([[0,'Pasta'],[1,'200gr salsa pesto'],[2,'100gr de queso Grana Padano']]),
    new Map([[0,'Cocer la pasta'],[1,'Escurrir y mezclar con la salsa'],[2,'Servir y espolvorear con parte del queso']])],

    ['Brownie', 'Delicia de chocolate', new Map([[0,'/Resources/brownie1.jpg'],[1,'/Resources/brownie2.jpg']]),
    new Map([[0,'Pasta'],[1,'200gr de mantequilla'],[2,'200 gr de chocolate'],[3,'150gr de harina sin levadura'],[4,'150 gr de azúcar']]),
    new Map([[0,'Derretir en una pota la mantequilla y chocolate'],[1,'Batir los huevos y mezclar con el azúcar'],[2,'Mezclar ambas elaboraciones y añadir la harina'],[3,'Hornear a 180 ºC durante 20 min.']])]

]

// Objeto receta que almacena los datos de una receta con diferentes funciones que usaremos 
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

    //getters y setters
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
    
    //función que modifica una receta comparándola con otra 
    modifyInto(r2){
        if (this.name!=r2.getName()){
            this.setName(r2.getName());
        }
        if (this.description!=r2.getDescription()){
            this.setDescription(r2.getDescription());
        }
        let image1 = this.getImages()
        let image2 = r2.getImages()
        let ingredient1 = this.getIngredients()
        let ingredient2 = r2.getIngredients()
        let preparation1 = this.getPreparation()
        let preparation2 = r2.getPreparation()

        for (let i = 0; i < image2.length; i++){
            if(image1.length <= i || image1[i][1]!=image2[i][1]){
                this.images.set(i,image2[i][1])
            }
        } 
        if (image1.length > image2.length){
            for (let i = image2.length; i < image1.length; i++){
                this.images.delete(i)
            }
        }
        for (let i = 0; i < ingredient2.length; i++){
            if(ingredient1.length <= i || ingredient1[i][1]!=ingredient2[i][1]){
                this.ingredients.set(i, ingredient2[i][1])
            }
        } 
        if (ingredient1.length > ingredient2.length){
            for (let i = ingredient2.length; i < ingredient1.length; i++){
                this.ingredients.delete(i)
            }
        }
        for (let i = 0; i < preparation2.length; i++){
            if(preparation1.length <= i || preparation1[i][1]!=preparation2[i][1]){
                this.preparation.set(i, preparation2[i][1])
            }

        } 
        if (preparation1.length > preparation2.length){
            for (let i = preparation2.length; i < preparation1.length; i++){
                this.preparation.delete(i)
            }
        }
    }
}

//carga las recetas predefinidas
for (const i of predefinedRecipes) {
    addRecipe(i)
}

//devuelve una lista de recetas desde el index from hasta to
export function getRecipes(from, to){
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
    return recipesArrayOfClass.slice(from, to);
}

export function getRecipe(i){
    let thisRecipe = recipes.get(i.toString())

    let imagesArray = thisRecipe.getImages()
    let imagesArrayClass = new Array()

    for (let i = 0; i < imagesArray.length; i++) {
        imagesArrayClass[i] = {image: imagesArray[i][1]}
    }

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


// Añade una receta a la lista de objetos receta
export function addRecipe(recipe) {
    let newRecipe = new Recipe(recipe)
    recipes.set(nextId.toString(), newRecipe);
    return nextId++
}

// Elimina una receta de la lista de objetos receta
export function deleteRecipe(id){
    recipes.delete(id.toString())
}

// Modifica una receta de la lista de objetos receta
export function editRecipe(n, classs){
    let newRecipeToEdit = new Recipe(classs)
    recipes.get(n).modifyInto(newRecipeToEdit)
}
