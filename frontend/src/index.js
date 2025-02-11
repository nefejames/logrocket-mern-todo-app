import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='bg-red-600'>

    <App />
    </div>
  </React.StrictMode>
);