import Navbar from "./Components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./Context/NoteState";
import { useEffect } from "react";

function App() {
  let location = useLocation();
  useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
  }, [location]);
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
