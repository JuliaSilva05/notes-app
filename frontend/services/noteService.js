import axios from "axios"
const http = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json"
    }
})

const getNotes = () => {
    return http.get("/notes")
}

const createNote = (data) => {
    return http.post("/notes", data)
}

const updateNote = (id, data) => {
    return http.put(`/notes/${id}`, data)
}

const deleteNote = (id) => {
    return http.delete(`/notes/${id}`)
}

export default {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}