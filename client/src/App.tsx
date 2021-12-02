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

import "./style.scss";
import { DashboardLayoutProvider } from "./Contexts/DashboardContexts";
import { UserProvider } from "./Contexts/UserContexts";
import Logout from "./Pages/Logout";

function App() {
  return (
    <DashboardLayoutProvider>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            {localStorage.getItem("accessToken") === null ? (
              <Route path="/" element={<Landing />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ssh-settings" element={<SshSettings />} />
                <Route path="/logout" element={<Logout />} />
              </>
            )}

            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </DashboardLayoutProvider>
  );
}

export default App;
