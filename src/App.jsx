import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import Register from './components/Registration/Register';
import Transacao from './components/Transaction/Transaction';
import { AuthProvider } from './context/AuthContext';
import DefaultLayout from './layouts/default-layout';
import Dashboard from './pages/dashboard';
import Goals from './pages/goals';
import Reports from './pages/reports';
import Settings from './pages/settings';
import PrivateRoute from './routes/PrivateRoute';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route
              element={
                <PrivateRoute>
                  <DefaultLayout />
                </PrivateRoute>
              }
            >
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Transacao />} path="/transacao" />
              <Route element={<Reports />} path="/relatorios" />
              <Route element={<Goals />} path="/metas" />
              <Route element={<Settings />} path="/configuracoes" />
            </Route>
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
