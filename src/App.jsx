import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transacao from "./components/transacao";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Menu from "./Menu";
import { AuthProvider } from "./context/AuthContext";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/transacao" element={<Transacao />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;