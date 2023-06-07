import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";

const NoteItem = (props) => {
  let { i } = props;
  let { note } = props;

  const context = useContext(NoteContext);
  const { deleteNotes } = context;
  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title" key={i}>
            {note.title}
          </h5>
          <p className="card-text" key={i}>
            {note.description}
          </p>
        </div>
        <div className="row">
          <button
            type="submit"
            className="btn btn-primary mx-4 my-3"
            style={{ width: "100px" }}>
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-danger mx-2 my-3"
            style={{ width: "100px" }}
            onClick={() => {
              deleteNotes(note._id);
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
