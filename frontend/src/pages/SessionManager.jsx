import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/MySession";
import "../styles/SessionManager.css";

function SessionManager() {
  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    getMySessions();
  }, []);

  const getMySessions = () => {
    api
      .get("/api/sessions/manage/")
      .then((res) => res.data)
      .then((data) => {
        setSessions(data);
      })
      .catch((err) => alert(err));
  };

  const deleteSession = (id) => {
    api
      .delete(`/api/sessions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Session deleted");
        else alert("Failed to delete the session");
        getMySessions();
      })
      .catch((error) => alert(error));
  };

  const createSession = (e) => {
    e.preventDefault();
    api
      .post("/api/sessions/manage/", {
        title,
        description,
        instructor,
        cost,
        date,
      })
      .then((res) => {
        if (res.status === 201) alert("Session created");
        else alert("Failed to create the session");
        getMySessions();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Session</h2>
        {sessions.map((session) => (
          <Session
            session={session}
            onDelete={deleteSession}
            key={session.id}
          />
        ))}
      </div>
      <h2>Create a Session</h2>
      <form onSubmit={createSession}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <label htmlFor="instructor">Instructor ID:</label>
        <input
          type="number"
          id="instructor"
          name="instructor"
          required
          onChange={(e) => setInstructor(e.target.value)}
          value={instructor}
        />

        <label htmlFor="cost">Cost ($):</label>
        <input
          type="number"
          id="cost"
          name="cost"
          required
          onChange={(e) => setCost(e.target.value)}
          value={cost}
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SessionManager;
