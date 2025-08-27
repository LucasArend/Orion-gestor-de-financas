import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/default-layout';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
          {/* <Route path="/reports" element={<ReportsPage />} /> */}
          {/* <Route path="/settings" element={<ReportsPage />} /> */}
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}
