import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./Context/NoteState";

function App() {
  return (
    <NoteState>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </NoteState>
  );
}

export default App;
