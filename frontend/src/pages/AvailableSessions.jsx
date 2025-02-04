import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/SessionA";

function AvailableSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = () => {
    api
      .get("/api/sessions/")
      .then((res) => res.data)
      .then((data) => setSessions(data))
      .catch((error) => alert(error));
  };

  const registerForSession = (sessionId) => {
    api
      .post(`/api/sessions/register/${sessionId}/`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("Successfully registered for the session!");
          getSessions();
        } else {
          alert("Failed to register for the session");
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(
            "Registration error: " + err.response.data.message ||
              err.response.statusText
          );
        } else {
          alert("Registration error: An unknown error occurred");
        }
      });
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      {sessions.map((session) => (
        <Session
          session={session}
          key={session.id}
          onRegister={() => registerForSession(session.id)}
        />
      ))}
    </div>
  );
}

export default AvailableSessions;
