import Notification from './Notification'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? '✅' : '❎'

  return (
    <div className='note'>
      <button onClick={toggleImportance}>{label}</button>
      <p>{note.content}</p>
      
    </div>
  )
}

export default Note