import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const app = express()

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'notesapp'
})
const prisma = new PrismaClient({adapter})

app.use(express.json())
app.use(cors())



app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany()
    res.json(notes)
})

app.post("/api/notes", async (req, res) => {
    const {title, content} = req.body
    if (!title || !content) {
        return res.status(400).json({"error": "Title and content are required!"})
    }
    try {
        const note = await prisma.note.create({
            data: {title, content},
        })
        res.json(note)
    } catch (error) {
        res.status(500).send("Error creating note!")
    }
})

app.put("/api/notes/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    const {title, content} = req.body

    if (!title || !content) {
        return res.status(400).send("Title and content are required!")
    }
    if (!id || isNaN(id)) {
        return res.status(400).send("Invalid note ID!")
    }

    try {
        const updatedNote = await prisma.note.update({
            where: {id},
            data: {title, content},
        })
        res.json(updatedNote)
    } catch (error) {
        res.status(500).send("Error updating note!")
    }
})

app.delete("/api/notes/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)){
        return res.status(400).send("Invalid note ID!")
    }
    try {
        await prisma.note.delete({
            where: {id},
        })
        res.status(204).send()
    } catch (error) {
        res.status(500).send("Error deleting note!")
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})