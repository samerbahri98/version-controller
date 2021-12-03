import React from "react";

function About() {
  return (
    <div className="container">
      <article className="message is-dark">
        <div className="message-header">
          <p>What is Version Controller</p>
        </div>
        <div className="message-body">
          Version Control is a web app for you to store all of your repositories
          and keep track of your progress. It is based on Git. it uses a
          microservices architecture with docker, and it can be self hosted
        </div>
      </article>
      <article className="message is-dark">
        <div className="message-header">
          <p>Why use Version Control?</p>
        </div>
        <div className="message-body">
          When GitHub launched their product GitHub Copilot. Lots of developers
          expressed discomfort of GitHub accessing their private repos to train
          the AI. hence the need for a self hosted alternative
        </div>
      </article>
      <article className="message is-dark">
        <div className="message-header">
          <p>Who created Version Control?</p>
        </div>
        <div className="message-body">
          Version Control was entirely created by Samer Bahri, a passionate
          23-year-old student, as part of a course in his bachelor studies. It
          was published on December 2021
        </div>
      </article>
    </div>
  );
}

export default About;
