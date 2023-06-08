import React, { useContext, useState } from "react";
import NoteContext from "../Context/NoteContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateNotes() {
  // below code is used to get the current note using Router useLocation
  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { editNotes } = context;

  const [note, setNote] = useState({
    title: location.state.title,
    tag: location.state.tag,
    description: location.state.description,
  });

  const update = (e) => {
    e.preventDefault();
    editNotes(location.state._id, note.title, note.description, note.tag);
    navigate("/");
  };

  const cancle = (e) => {
    navigate("/");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Update Note</h1>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
            minLength={3}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-3" onClick={update}>
          Update Note
        </button>
        <button
          type="submit"
          className="btn btn-secondary my-3 mx-3"
          onClick={cancle}>
          Cancle
        </button>
      </form>
    </div>
  );
}
