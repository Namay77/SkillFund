import React from "react";
import "../styles/Session.css";

function Session({ session, onDelete }) {
  return (
    <div className="session-card">
      <h2>{session.title}</h2>
      <p>
        <strong>Description:</strong> {session.description}
      </p>
      <p>
        <strong>Instructor:</strong> {session.instructor}
      </p>
      <p>
        <strong>Cost:</strong> ${session.cost}
      </p>
      <p>
        <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
      </p>
      <button onClick={() => onDelete(session.id)}>Delete</button>
    </div>
  );
}

export default Session;
