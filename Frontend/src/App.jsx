import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import axios from "axios";
import Moments from "./pages/Moments";
import Adventures from "./pages/Adventures";
import MapPage from "./pages/MapPage";

axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={ <MapPage />} />
        <Route path="/adventures/moments" element={<Moments />} />
        <Route path="/adventures" element={<Adventures />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
