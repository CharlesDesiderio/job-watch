const Note = ({ date, note }) => {
  const getReadableDate = new Date(date).toLocaleString()
  
  return (
    <div>
      <hr />
      <span className="text-gray-400 text-xs block">{getReadableDate}</span>
      <span className="text-gray-400 text-xs block">{note}</span>
    </div>
  )
}

export default Note