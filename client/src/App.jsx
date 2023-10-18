import './App.css';
import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Dashboard from './Components/Dashboard.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';

import { useEffect, useState } from 'react';
//  toast.configure()
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth=(boolean)=>{
    setIsAuthenticated(boolean);
  }

async function isAuth(){
  try {
    const response=await fetch("http://localhost:5000/auth/is-verify",{
      method:"GET",
      headers:{token:localStorage.token}
    });

    const parseRes=await response.json();
    parseRes===true?setIsAuthenticated(true):setIsAuthenticated(false);
  } catch (err) {
    console.error(err.message);
  }
}
  useEffect(()=>{
    isAuth();
  },[])
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
