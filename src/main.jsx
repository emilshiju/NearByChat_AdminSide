import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { Responsive } from './context/createContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Responsive >
    <BrowserRouter>
    
    <App />
   
    </BrowserRouter>
    </Responsive>
  </React.StrictMode>,
)
