import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/SessionP";
import "../styles/SessionManager.css";

function SessionManager() {
  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [capacity, setCapacity] = useState(1);

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = () => {
    api
      .get("/api/sessions/create/")
      .then((res) => res.data)
      .then((data) => setSessions(data))
      .catch((err) => alert(err));
  };

  const deleteSession = (id) => {
    api
      .delete(`/api/sessions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Session deleted");
        else alert("Failed to delete the session");
        getSessions();
      })
      .catch((error) => alert(error));
  };

  const createSession = (e) => {
    e.preventDefault();
    api
      .post("/api/sessions/create/", {
        title,
        description,
        cost,
        date,
        time,
        duration,
        capacity,
      })
      .then((res) => {
        if (res.status === 201) alert("Session created");
        else alert("Failed to create the session");
        getSessions();
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

        <label htmlFor="cost">Cost ($):</label>
        <input
          type="number"
          id="cost"
          name="cost"
          required
          onChange={(e) => setCost(Number(e.target.value))}
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

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          required
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />

        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          required
          onChange={(e) => setDuration(Number(e.target.value))}
          value={duration}
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          required
          onChange={(e) => setCapacity(Number(e.target.value))}
          value={capacity}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SessionManager;
