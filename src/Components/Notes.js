import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <h3>Your Notes : </h3>
      {notes.map((note) => {
        return note.title;
      })}
    </div>
  );
};

export default Notes;
