import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";

export default function About() {
  const a = useContext(NoteContext);

  return <div>About {a.name}</div>;
}
