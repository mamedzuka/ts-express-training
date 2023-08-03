import express from "express"

const app = express()
const port : number = 3000
const db = {
    dishes: [
        {id: 1, name: "burger"},
        {id: 2, name: "bebzi"}
    ]
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        message: "Здарова, борода!"
    })
}) 

app.get('/roma', (req: express.Request, res: express.Response) => {
    let foundDishes: Array<{id: number, name: string}> = db.dishes
    if (req.query.name) {
        foundDishes = foundDishes
        .filter((dish) => dish.name.indexOf(req.query.name) > -1)
    }

    res.json(foundDishes)
})

app.get('/roma/:id', (req: express.Request, res: express.Response) => {
    const foundDish: {id: number, name: string} | undefined = db.dishes.find((dish) => dish.id === +req.params.id)

    if(!foundDish) {
        res.sendStatus(404)
        return;
    }
    res.json(foundDish)
})

app.post('/roma', (req: express.Request, res: express.Response) => {
    if(!req.body.name) {
        res.sendStatus(404)
        return;
    }
    
    let newDish: {id: number, name: string} = {
        id: +(new Date()),
        name: req.body.name
    }
    
    db.dishes.push(newDish)
    res.status(201).json(newDish)
})

app.delete('/roma/:id', (req: express.Request, res: express.Response) => {
    db.dishes = db.dishes.filter((dish) => dish.id !== +req.params.id)

    res.sendStatus(204)
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})