import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Menu from "./Menu";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./components/NotFound";
import Transacao from "./components/transacao";
import Register from "./components/Register"



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