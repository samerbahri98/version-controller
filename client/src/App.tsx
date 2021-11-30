import React from "react";
import { Provider } from "react-redux";
// import { Switch } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard/Components";
import Landing from "./Pages/Landing/";
import store from "./store";
import "./style.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {window.sessionStorage.getItem("accessToken") === null ? (
            <Route path="/" element={<Landing />} />
          ) : (
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
          )}
        </Routes>
      </Router>

      {/* <Navbar /> */}
      {/* <Landing /> */}
    </Provider>
  );
}

export default App;
