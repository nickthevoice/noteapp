import { useState, useEffect } from 'react'
import Note from './components/Note'
import Search from './components/Search'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`This note was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <main>
      <div className='content'>
        <header>
          <h1>Notes</h1>
        </header>

        <div className="header-bottom">
          <Search
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={handleNoteChange}
          />
          <button className='importance-button' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Important' : 'All' }
          </button>
        </div>
      
        <div className='notes'>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </div>
        <Notification message={errorMessage} />
      </div>
      <Footer />
    </main>
  )
}

export default App