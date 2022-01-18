import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

import { db } from "./utils/db.js";
import { useLiveQuery } from "dexie-react-hooks";

function App() {
  const [orignotes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const notes = useLiveQuery(() => db.notes.toArray(), []);

  const [activeNoteId, setActiveNoteId] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  if (!notes) return null;

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: `Untitled Note    ->${Math.floor(
        Math.random() * 1000
      ).toString()}`,
      body: "",
      cAt: Date.now(),
      uAt: Date.now(),
    };

    db.notes.add(newNote);

    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    db.notes.delete(noteId);

    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    //  db.notes.update(updatedNote.id, updatedNote);

    db.notes.update(activeNoteId, updatedNote);

    // const updatedNotesArr = notes.map((note) => {
    //   if (note.id === updatedNote.id) {
    //     return updatedNote;
    //   }

    //   return note;
    // });

    // setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNoteId);
  };

  return (
    <>
      <h1 className="top-heading">Notes in the browser. How cool!</h1>
      <hr className="top-hr-line" />
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
        />

        <Main
          activeNote={getActiveNote()}
          activeNoteId={activeNoteId}
          onUpdateNote={onUpdateNote}
        />
      </div>
    </>
  );
}

export default App;
