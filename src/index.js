import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { BudgetProvider } from './Contexts/BudgetContext'

ReactDOM.render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
