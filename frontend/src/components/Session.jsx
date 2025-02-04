import React from "react";
import "../styles/SessionA.css";

function Session({ session, onRegister }) {
  return (
    <div className="session-card">
      <h2>{session.title}</h2>
      <p>
        <strong>Description:</strong> {session.description}
      </p>
      <p>
        <strong>Instructor:</strong> {session.instructor_name}
      </p>
      <p>
        <strong>Cost:</strong> ₹{session.cost}
      </p>
      <p>
        <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Registrations:</strong> {session.registrations.length} /{" "}
        {session.capacity}
      </p>
      <button onClick={() => onRegister(session.id)}>Register</button>
    </div>
  );
}

export default Session;
