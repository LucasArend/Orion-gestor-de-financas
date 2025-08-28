import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from './layouts/default-layout';
import Dashboard from './pages/dashboard';
import Login from "./components/Login/Login";
import Menu from "./Menu";
import NotFound from "./components/NotFound";
import Transacao from "./components/Transaction/TransactionBody";
import Register from "./components/Registration/Register"


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
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
