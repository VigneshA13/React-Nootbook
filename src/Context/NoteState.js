import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate = useNavigate();
  const notesInitial = [
    {
      _id: "647b07e4bfdfe867f28e1590",
      user: "64782bdadcbbf339f1ac05ed",
      title: "demo2 naotes",
      description:
        "hello2, this is a new note hello2, this is a new note hello2, this is a new note ",
      tag: "test2",
      date: "2023-06-03T09:29:08.087Z",
      __v: 0,
    },
    {
      _id: "647b07e4bfdfe867f28e1592",
      user: "64782bdadcbbf339f1ac05ed",
      title: "demo1 naotes",
      description: "hello2, this is a new note",
      tag: "test2",
      date: "2023-06-03T09:29:08.662Z",
      __v: 0,
    },
    {
      _id: "647b07e4bfdfe867f28e1594",
      user: "64782bdadcbbf339f1ac05ed",
      title: "demo3 naotes",
      description: "hello2, this is a new note",
      tag: "test2",
      date: "2023-06-03T09:29:08.849Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add notes
  const addNotes = (title, description, tag) => {
    console.log("Adding note");
    let note = {
      _id: "647b07e4bfdfe867f28e1594",
      user: "64782bdadcbbf339f1ac05ed",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-03T09:29:08.849Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    navigate("/");
  };

  //Delete a notes
  const deleteNotes = (id) => {
    console.log(id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  //Edit a notes
  const editNotes = (id, title, description, tag) => {};

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
