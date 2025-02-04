import React from "react";
import "../styles/SessionP.css";

function Session({ session, onDelete }) {
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
        <strong>Cost:</strong> ${session.cost}
      </p>
      <p>
        <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
      </p>

      {/* Added paragraphs to display the number of registrations and capacity */}
      <p>
        <strong>Registrations:</strong> {session.registrations.length} /{" "}
        {session.capacity}
      </p>

      {/* Delete button */}
      <button onClick={() => onDelete(session.id)}>Delete</button>
    </div>
  );
}

export default Session;
