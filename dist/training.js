"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const db = {
    dishes: [
        { id: 1, name: "burger" },
        { id: 2, name: "bebzi" }
    ]
};
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.get('/', (req, res) => {
    res.json({
        message: "Здарова, борода!"
    });
});
app.get('/roma', (req, res) => {
    let foundDishes = db.dishes;
    if (req.query.name) {
        foundDishes = foundDishes
            .filter((dish) => dish.name.indexOf(req.query.name) > -1);
    }
    res.json(foundDishes);
});
app.get('/roma/:id', (req, res) => {
    const foundDish = db.dishes.find((dish) => dish.id === +req.params.id);
    if (!foundDish) {
        res.sendStatus(404);
        return;
    }
    res.json(foundDish);
});
app.post('/roma', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(404);
        return;
    }
    let newDish = {
        id: +(new Date()),
        name: req.body.name
    };
    db.dishes.push(newDish);
    res.status(201).json(newDish);
});
app.delete('/roma/:id', (req, res) => {
    db.dishes = db.dishes.filter((dish) => dish.id !== +req.params.id);
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
