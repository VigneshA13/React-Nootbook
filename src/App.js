import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import AddNotes from "./Components/AddNotes";
import Home from "./Components/Home";
import UpdateNotes from "./Components/UpdateNotes";
import NoteState from "./Context/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <NoteState>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AddNotes />} />
        <Route path="/update" element={<UpdateNotes />} />
      </Routes>
    </NoteState>
  );
}

export default App;
