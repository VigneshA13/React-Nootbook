import React from "react";

const NoteItem = (props) => {
  let { note } = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
        <div className="row">
          <a
            href="/"
            className="btn btn-primary mx-4 my-3"
            style={{ width: "100px" }}>
            Edit
          </a>
          <a
            href="/"
            className="btn btn-danger mx-2 my-3"
            style={{ width: "100px" }}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
