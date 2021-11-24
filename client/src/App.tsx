import React from 'react';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard/Components';
import Login from './Pages/Login';
import "./style.scss"

function App() {
  return (
    <>
    <Navbar />
    <Dashboard />
    </>
  );
}

export default App;
