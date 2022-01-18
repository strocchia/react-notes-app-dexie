const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNoteId,
  setActiveNoteId,
}) => {
  const sortedNotes = notes.sort((a, b) => b.uAt - a.uAt);

  const textExtent = 20;

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        {/* <button onClick={onAddNote}>Add</button> */}
        <button onClick={onAddNote}>+</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, uAt }, idx) => (
          <div
            className={`app-sidebar-note ${id === activeNoteId && "active"}`}
            onClick={() => setActiveNoteId(id)}
            key={idx}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>X</button>
            </div>

            <p>{body && body.substr(0, textExtent) + "..."}</p>
            <small className="note-meta">
              Last Mod: {"  "}
              {new Date(uAt).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
