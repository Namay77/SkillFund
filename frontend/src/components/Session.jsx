import React from "react";
import "../styles/SessionA.css";

function Session({ session, onRegister }) {
  return (
    <div className="session-card">
      <div className="session-card-header">Session</div>
      <h2>{session.title}</h2>
      <p><strong>Description:</strong> {session.description}</p>
      <div className="separator"></div>
      <p><strong>Instructor:</strong> {session.instructor_name}</p>
      <p className="cost"><strong>Cost:</strong> ₹{session.cost}</p>
      <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
      <div className="separator"></div>
      <p className="registrations"><strong>Registrations:</strong> {session.registrations.length} / {session.capacity}</p>
      <button className="register-btn" onClick={() => onRegister(session.id)}>Register</button>
    </div>
  );
}

export default Session;
