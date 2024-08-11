/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';

import { AuthContextProvider } from './context/AuthContext.js';
import { WorkoutContextProvider } from './context/WorkoutContext.js';

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App></App>
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)