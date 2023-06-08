import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import AddNotes from "./Components/AddNotes";
import Home from "./Components/Home";
import UpdateNotes from "./Components/UpdateNotes";
import NoteState from "./Context/NoteState";

function App() {
  return (
    <NoteState>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AddNotes />} />
        <Route path="/update" element={<UpdateNotes />} />
      </Routes>
    </NoteState>
  );
}

export default App;
