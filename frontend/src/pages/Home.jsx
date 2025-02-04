import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/Session";
import Popup from "../components/Popup";

function Home() {
  const [sessions, setSessions] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getSessions();
  }, []);

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const getSessions = () => {
    api
      .get("/api/sessions/")
      .then((res) => setSessions(res.data))
      .catch(() => showPopup("Failed to fetch sessions"));
  };

  const registerForSession = (sessionId) => {
    api
      .post(`/api/sessions/register/${sessionId}/`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          showPopup("Successfully registered for the session!");
          getSessions();
        } else {
          showPopup("Failed to register for the session");
        }
      })
      .catch((err) => {
        if (err.response) {
          showPopup(
            "Registration error: " +
              (err.response.data.message || err.response.statusText)
          );
        } else {
          showPopup("Registration error: An unknown error occurred");
        }
      });
  };

  return (
    <div>
      {popupVisible && <Popup message={popupMessage} />}

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

export default Home;
