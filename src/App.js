import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import AddNotes from "./Components/AddNotes";
import Home from "./Components/Home";
import NoteState from "./Context/NoteState";

function App() {
  return (
    <NoteState>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AddNotes />} />
      </Routes>
    </NoteState>
  );
}

export default App;
