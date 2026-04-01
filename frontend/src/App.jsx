import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <>
      <header>
        <div>
          <h1>Notes App</h1>
          <ul>
            <li><button>+</button></li>
          </ul>
        </div>
      </header>

      <body>
        <div>
          <h2>Title</h2>
          <p>Content</p>
        </div>
      </body>
    </>
  )
}



export default App
