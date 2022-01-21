import React from "react";
// import { Switch } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Help from "./Pages/Help";
import Landing from "./Pages/Landing/";
import SshSettings from "./Pages/SshSettings";
import NotFound from "./Pages/NotFound";
import "react-toastify/scss/main.scss";
import "./style.scss";
import { DashboardLayoutProvider } from "./Contexts/DashboardContexts";
import { UserProvider } from "./Contexts/UserContexts";
import Logout from "./Pages/Logout";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <DashboardLayoutProvider>
      <UserProvider>
        <Router>
          <Routes>
            {localStorage.getItem("accessToken") === null ? (
              <Route
                path="/"
                element={
                  <>
                    <ToastContainer
                      icon={false}
                      hideProgressBar={true}
                      newestOnTop={true}
                      transition={Slide}
                    />

                    <Landing />
                  </>
                }
              />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />

                      <ToastContainer
                        icon={false}
                        hideProgressBar={true}
                        newestOnTop={true}
                        transition={Slide}
                      />

                      <Dashboard />
                    </>
                  }
                />
                <Route
                  path="/ssh-settings"
                  element={
                    <>
                      <Navbar />
                      <SshSettings />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <Navbar />
                      <About />
                    </>
                  }
                />
                <Route
                  path="/help"
                  element={
                    <>
                      <Navbar />
                      <Help />
                    </>
                  }
                />
                <Route path="/logout" element={<Logout />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </DashboardLayoutProvider>
  );
}

export default App;
