import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate = useNavigate();
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get Notes
  const getNotes = async () => {
    let url = "http://localhost:5000/api/notes/notes";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ODJiZGFkY2JiZjMzOWYxYWMwNWVkIn0sImlhdCI6MTY4NTYwNDY2NH0.HxCLbunVGGQDjuQzhS_wYXHVRwL-vw2ZUgV6hBAvobU",
      },
    });
    const out = await response.json();
    console.log(out);
    setNotes(out);
  };
  //Add notes
  const addNotes = async (title, description, tag) => {
    let url = "http://localhost:5000/api/notes/create";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ODJiZGFkY2JiZjMzOWYxYWMwNWVkIn0sImlhdCI6MTY4NTYwNDY2NH0.HxCLbunVGGQDjuQzhS_wYXHVRwL-vw2ZUgV6hBAvobU",
      },
      body: JSON.stringify(title, description, tag),
    });

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
  const editNotes = async (id, title, description, tag) => {
    let url = "localhost:5000/api/notes/update/" + id;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ODJiZGFkY2JiZjMzOWYxYWMwNWVkIn0sImlhdCI6MTY4NTYwNDY2NH0.HxCLbunVGGQDjuQzhS_wYXHVRwL-vw2ZUgV6hBAvobU",
      },
      body: JSON.stringify(title, description, tag),
    });
    

    for (let val of notes) {
      if (val._id === id) {
        val.title = title;
        val.description = description;
        val.tag = tag;
      }
    }
    // const json = response.json();
    //return response.json();
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
