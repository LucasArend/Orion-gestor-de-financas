import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupChartJs } from './lib/chartjs-config';

setupChartJs()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
