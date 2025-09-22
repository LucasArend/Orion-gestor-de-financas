import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import Register from './components/Registration/Register';
import Transacao from './components/Transaction/TransactionBody';
import { AuthProvider } from './context/AuthContext';
import DefaultLayout from './layouts/default-layout';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<DefaultLayout />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Transacao />} path="/transacao" />
            <Route element={<Reports />} path="/relatorios" />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
