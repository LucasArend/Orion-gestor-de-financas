import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from './layouts/default-layout';
import Dashboard from './pages/dashboard';
import Login from "./components/Login";
import Dashboard2 from "./components/Dashboard";
import Menu from "./Menu";
import NotFound from "./components/NotFound";
import Transacao from "./components/Transaction/Transaction";
import Register from "./components/Register"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route
            path="/dashboard"
            element={
              <DefaultLayout>
                <Dashboard />
              </DefaultLayout>
            }
          />
          <Route
            path="/transacao"
            element={
              <DefaultLayout>
                <Transacao />
              </DefaultLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
