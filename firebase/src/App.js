import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./pages/SignUpForm.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
