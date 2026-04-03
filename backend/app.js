import express from "express";
import cors from "cors";
import db from "./src/models/index.js"
import noteRoutes from "./src/routes/noteRoutes.js"

const app = express()
const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Notes App!" })
})

noteRoutes(app)

db.sequelize.sync().then(() => {
    console.log("Database synced!")
})


app.listen(port, () => {
    console.log("App listening on port " + port)
})