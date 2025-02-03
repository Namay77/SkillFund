import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/Session";

function Home() {
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

  return (
    <div>
      <h2>Available Sessions</h2>
      {sessions.map((session) => (
        <Session session={session} key={session.id} />
      ))}
    </div>
  );
}

export default Home;
