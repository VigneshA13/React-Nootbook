import React, { useContext, useState } from "react";
import NoteContext from "../Context/NoteContext";

export default function AddNotes() {
  const context = useContext(NoteContext);
  const { addNotes } = context;

  const [note, setNote] = useState({
    title: "",
    tag: "general",
    description: "",
  });
  const submit = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Add Notes</h1>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onchange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            onChange={onchange}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary my-3" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}
