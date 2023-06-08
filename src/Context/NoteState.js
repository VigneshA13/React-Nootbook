import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const token = localStorage.getItem("token");

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
        "auth-token": token,
      },
    });
    const out = await response.json();
    //console.log(out);
    setNotes(out);
  };
  //Add notes
  const addNotes = async (title, description, tag) => {
    // API call
    let url = "http://localhost:5000/api/notes/create";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let note = {
      _id: "647b07e4bfdfe867f28e1594",
      user: "64782bdadcbbf339f1ac05ed",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-03T09:29:08.849Z",
      __v: 0,
    };
    if (response.ok) {
      console.log("notes added");
    }
    setNotes(notes.concat(note));
    navigate("/home");
  };

  //Delete a notes
  const deleteNotes = async (id) => {
    // API call
    let url = "http://localhost:5000/api/notes/delete/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      console.log("Note deleted successfully");
    }
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  //Edit a notes
  const editNotes = async (id, title, description, tag) => {
    let url = "http://localhost:5000/api/notes/update/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.ok) {
      console.log("Updated successfully");
    }

    for (let val of notes) {
      if (val._id === id) {
        val.title = title;
        val.description = description;
        val.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
