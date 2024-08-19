import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { Responsive } from './context/createContext.jsx';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Responsive>
      <BrowserRouter>
        <App />
        <ToastContainer /> 
      </BrowserRouter>
    </Responsive>
  </React.StrictMode>,
  root
);


// ReactDOM.render(
//   <React.StrictMode>
//     <Responsive >
//     <BrowserRouter>
    
//     <App />
   
//     </BrowserRouter>
//     </Responsive>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
