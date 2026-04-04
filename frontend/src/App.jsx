import { use, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")  
  const [notes, setNotes] = useState([])

  const [editing, setEditing] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notes")
        const notes = await response.json()
        setNotes(notes)
      } catch (e){
        console.log(e)
      }
    }
    fetchNotes()
  }, [])

  const handleEdit = (note) => {
    setEditing(note.id)
    setTitle(note.title)
    setContent(note.content)
    document.getElementById("form").scrollIntoView({behavior: "smooth"})
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setEditing(null)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (editing){
      try{
        const response = await fetch(`http://localhost:3000/api/notes/${editing}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({title, content}),
        })
        const updatedNote = await response.json()
        setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)))
        document.getElementById(updatedNote.id).scrollIntoView({behavior: "smooth"})
      }catch{
        console.log(e)
      }
      setEditing(null)
    }
    else {
      try{
        const response = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({title, content}),
        })
        const newNote = await response.json()
        setNotes([...notes, newNote])
      }catch{
        console.log(e)
      }
    }
    setTitle("")
    setContent("")
  }


  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      if (window.confirm("Are you sure you want to delete this note?")){
        await fetch(`http://localhost:3000/api/notes/${id}`, {
          method: "DELETE",
        })
        const updatedNotes = notes.filter((note) => note.id !== id)
        setNotes(updatedNotes)
      }
    } catch {
      console.log(e)
    }
  }
  
  return (
    <>
      <div className='header'>
        <h1>Notes App</h1>
      </div>
      
      <form id='form' className='note' onSubmit={handleAdd}>
        <div className='note-form'>
          <input 
            type='text' 
            placeholder='Title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required/>
          <textarea 
            rows={3}
            placeholder='Content' 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required/>
        </div>
        <div className='note-buttons'>
          <button type='submit' className='btn-note'>{ editing ? "Update":"Add" }</button>
          <button className='btn-note' onClick={handleCancel}>Cancel</button>
        </div>
      </form>

      
      {notes.map((note) => (
        <div id={note.id} className='note' key={note.id}>
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
          <div className='note-buttons'>
            <small>
              <p className='date'>{note.createdAt.split("T")[0]}</p>
            </small>
            <button className='btn-note' onClick={() => handleEdit(note)}>Edit</button>
            <button className='btn-note' onClick={(e) => handleDelete(e, note.id)}>Delete</button>
          </div>
        </div>
      ))}


    </>
  )
}


export default App