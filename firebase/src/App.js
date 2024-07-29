import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./pages/SignUpForm.js";
import LoginForm from "./pages/LoginForm.js";
import Homepage from "./pages/Homepage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
