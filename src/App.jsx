import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Menu from "./Menu";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./components/NotFound";
import Transacao from "./components/Transaction/Transaction";
import Register from "./components/Register"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/transacao" element={<Transacao />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;