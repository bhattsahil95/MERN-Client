import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'
import routes from './routesConfig.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import Footer from '../src/components/Keeper/Footer'; 


function App() {

  
  return (
    <div> 
   <ToastContainer
        autoClose={2000} // Optional: Set the autoClose duration in milliseconds
        newestOnTop // Optional: Display the newest toast on top
        closeOnClick // Optional: Close the toast when clicked
        rtl={false} // Optional: Set to true for right-to-left languages
        pauseOnFocusLoss // Optional: Pause toast when the window loses focus
        draggable // Optional: Allow dragging the toast
        pauseOnHover // Optional: Pause toast when hovering over it
      />
    <Router>
    <Navigation />
      <Routes>
      {console.log(routes)}
      {console.log("Working")}
      {routes.map((route) => (
  <Route key={route.path} path={route.path} element={<route.component />} />
))}

      </Routes>
    </Router>
    <Footer />
  

    </div>
  );
}

export default App;