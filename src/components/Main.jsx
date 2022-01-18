import React, { useState } from "react";

import ReactMarkdown from "react-markdown";

import { db } from "../utils/db";
import { useLiveQuery } from "dexie-react-hooks";

const Main = ({
  //activeNote,
  activeNoteId,
  onUpdateNote,
}) => {
  const [item, setItem] = useState(null);

  useLiveQuery(
    () =>
      db.notes
        .where({ id: activeNoteId })
        .first()
        .then((data) => {
          setItem(data);
        }),
    [activeNoteId]
  );

  // useEffect(() => {
  //   if (activeNote) {
  //     setItem(activeNote ? activeNote : null);
  //   }
  // }, [activeNote]);

  // if (!mainNote) return <div className="no-active-note">No Main Note</div>;

  // if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  if (!item) return <div className="no-active-note">No Active Note</div>;

  // const [cursor, setCursor] = useState(null);

  // useEffect(() => {
  //   if (activeNote) {
  //     setItem({
  //       ...activeNote,
  //       title: activeNote.title,
  //       body: activeNote.body,
  //     });
  //   }
  // }, [activeNote]);

  // useEffect(() => {
  //   setItem({ ...activeNote });
  // }, [activeNote]);

  // useEffect(() => {
  //   const input = ref.current;
  //   if (input) input.setSelectionRange(cursor, cursor);
  //   // }, []);
  // }, [ref, cursor, activeNote?.body]);

  const onEditField = (field, value) => {
    setItem((item) => ({
      ...item,
      [field]: value,
      uAt: Date.now(),
    }));
  };

  const executeSave = () => {
    onUpdateNote(item);

    // onUpdateNote({
    //   // ...mainNote,
    //   [field]: value,
    //   uAt: Date.now(),
    // });
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          // defaultValue={mainNote.title}
          value={item.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
          onBlur={(e) => {
            e.preventDefault();
            executeSave();
          }}
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          // defaultValue={mainNote.body}
          value={item.body}
          rows={10}
          onChange={(e) => {
            // setCursor(e.target.selectionStart);
            onEditField("body", e.target.value);
          }}
          onBlur={(e) => {
            e.preventDefault();
            executeSave();
          }}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{item.title}</h1>
        <ReactMarkdown className="markdown-preview">{item.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
