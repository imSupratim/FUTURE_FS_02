import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LeadDetails from "./pages/LeadDetails";
import Navbar from "./components/Navbar";
import LeadForm from "./pages/LeadForm";
import Home from "./pages/Home"

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/form" element={<LeadForm/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
