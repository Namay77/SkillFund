import { useState, useEffect } from "react";
import api from "../api";

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

  return <div>Home</div>;
}

export default Home;
