const menu = {
    _courses: {
        appetizers: [],
        mains: [],
        desserts: []
    },
    set _appetizers(appetizer) {
        this._appetizers.push(appetizer);
    },
    set _mains(mains) {
        this._mains.push(mains);
    },
    set _desserts(dessert) {
        this._desserts.push(dessert);
    },
    get _appetizers() {
        return this._courses.appetizers;
    },
    get _mains() {
        return this._courses.mains;
    },
    get _desserts() {
        return this._courses.desserts;
    },
    get courses() {
        return this._courses;
    },
    addDishToCourse(courseName, dishName, dishPrice) {
        const dish = {
            name: dishName,
            price: dishPrice
        }
        switch (courseName) {
        case "appetizers":
            this._appetizers = dish;
            break;
        case "mains":
            this._mains = dish;
            break;
        case "desserts":
            this._desserts = dish;
            break;
        }
    },
    getRandomDishFromCourse(courseName) {
        let dishes = [];
        switch (courseName) {
        case "appetizers":
            dishes = this.courses[courseName];
            break;
        case "mains":
            dishes = this.courses[courseName];
            break;
        case "desserts":
            dishes = this.courses[courseName];
            break;
        }
        return dishes[Math.floor(Math.random() * dishes.length)];
    },
    generateRandomMeal() {
        let appetizer = this.getRandomDishFromCourse("appetizers");
        let main = this.getRandomDishFromCourse("mains");
        let dessert = this.getRandomDishFromCourse("desserts");
        return `Tonight's meal is: ${appetizer["name"]}, ${main["name"]}, and ${dessert["name"]}
             for a total cost of $${appetizer["price"] + main["price"] + dessert["price"]}`;
    }
};

menu.addDishToCourse("appetizers", "Soup", 1);
menu.addDishToCourse("appetizers", "Shrimp", 4);
menu.addDishToCourse("appetizers", "Bacon Jalapenos", 3.5);
menu.addDishToCourse("mains", "Beef tacos", 3);
menu.addDishToCourse("mains", "Cheeseburger", 4.50);
menu.addDishToCourse("mains", "Chicken Fried Steak", 9);
menu.addDishToCourse("desserts", "Creme Brulee", 5);
menu.addDishToCourse("desserts", "Ice cream", 2);
menu.addDishToCourse("desserts", "Cherry Pie", 3);

console.log(menu.generateRandomMeal());