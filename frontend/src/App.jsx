import { use, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")  
  const [notes, setNotes] = useState([])

  const [editing, setEditing] = useState(null)

  const handleEdit = (note) => {
    setEditing(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setEditing(null)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (editing) {
      const updatedNotes = {
        id: editing.id,
        title: title,
        content: content,
        createdAt: editing.createdAt,
      }
      setNotes(notes.map((note) => note.id === editing.id ? updatedNotes : note))
      setEditing(null)
    } else {
      const newNote = {
        id: notes.length + 1,
        title: title,
        content: content,
        createdAt: new Date().toLocaleDateString(),
      }
      setNotes([newNote, ...notes])
    }
    setTitle("")
    setContent("")
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
  }
  
  return (
    <>
      <div className='header'>
        <h1>Notes App</h1>
      </div>
      
      <form className='note' onSubmit={handleAdd}>
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
          <button type='submit' className='btn-note'>Save</button>
          <button className='btn-note' onClick={handleCancel}>Cancel</button>
        </div>
      </form>

      
      {notes.map((note) => (
        <div className='note' key={note.id}>
          <div>
            <h2>{note.title}</h2>
            <line/>
            <p>{note.content}</p>
          </div>
          <div className='note-buttons'>
            <p>{note.createdAt}</p>
            <button className='btn-note' onClick={() => handleEdit(note)}>Edit</button>
            <button className='btn-note' onClick={(e) => handleDelete(e, note.id)}>Delete</button>
          </div>
        </div>
      ))}


    </>
  )
}


export default App