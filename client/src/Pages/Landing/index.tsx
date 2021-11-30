import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import "../../style.scss";
import Login from "./Login";
import { useState } from "react";
import Register from "./Register";

function Landing() {
  const [loginForm, setLoginForm] = useState(true);

  const toggle = () => setLoginForm(!loginForm)
  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen has-text-centered">
              <FontAwesomeIcon icon={faCodeBranch} size="4x" />
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box">
                {
                  loginForm ? (<Login toggle={toggle}/>) : (<Register toggle={toggle}/>)
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
