
const Search = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form className="search-bar" onSubmit={addNote}>
      <input
        placeholder="New note"
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">
        <img src="https://icon-library.com/images/save-image-icon/save-image-icon-24.jpg" alt="" />
      </button>
    </form>
  )
}

export default Search