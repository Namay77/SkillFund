import { useState, useEffect } from "react";
import api from "../api";
import Session from "../components/MySession";
import Popup from "../components/Popup"; // Import Popup component
import "../styles/SessionManager.css";

function MySessions() {
  const [sessionsC, setSessionsC] = useState([]);
  const [sessionsR, setSessionsR] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [capacity, setCapacity] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getCSessions();
    getRSessions();
  }, []);

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const getCSessions = () => {
    api
      .get("/api/sessions/create/")
      .then((res) => setSessionsC(res.data))
      .catch((err) => showPopup("Failed to fetch created sessions"));
  };

  const getRSessions = () => {
    api
      .get("/api/sessions/registered/")
      .then((res) => setSessionsR(res.data))
      .catch((err) => showPopup("Failed to fetch registered sessions"));
  };

  const deleteSession = (id) => {
    api
      .delete(`/api/sessions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) showPopup("Session deleted successfully");
        else showPopup("Failed to delete the session");
        getCSessions();
      })
      .catch(() => showPopup("Error deleting session"));
  };

  const createSession = (e) => {
    e.preventDefault();

    // Validation Checks
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    if (selectedDateTime <= currentDateTime) {
      showPopup("Session must be scheduled in the future.");
      return;
    }
    if (cost < 0) {
      showPopup("Cost cannot be negative.");
      return;
    }
    if (capacity < 1 || capacity > 10) {
      showPopup("Capacity must be at least 1 and not more than 10.");
      return;
    }
    if (duration <= 0) {
      showPopup("Duration must be positive.");
      return;
    }

    // Create session if validations pass
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
        if (res.status === 201) showPopup("Session created successfully");
        else showPopup("Failed to create the session");
        getCSessions();
      })
      .catch(() => showPopup("Error creating session"));
  };

  return (
    <div>
      {popupVisible && <Popup message={popupMessage} />}

      <div>
        <h2>Active Sessions</h2>
        {sessionsC.map((sessionC) => (
          <Session session={sessionC} onDelete={deleteSession} key={sessionC.id} />
        ))}
      </div>

      <div>
        <h2>Registered Sessions</h2>
        {sessionsR.map((sessionR) => (
          <Session session={sessionR} onDelete={deleteSession} key={sessionR.id} />
        ))}
      </div>

      <h2>Create a Session</h2>
      <form onSubmit={createSession}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

        <label htmlFor="cost">Cost ($):</label>
        <input type="number" id="cost" name="cost" required onChange={(e) => setCost(Number(e.target.value))} value={cost} />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required onChange={(e) => setDate(e.target.value)} value={date} />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" required onChange={(e) => setTime(e.target.value)} value={time} />

        <label htmlFor="duration">Duration (minutes):</label>
        <input type="number" id="duration" name="duration" required onChange={(e) => setDuration(Number(e.target.value))} value={duration} />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" name="capacity" required onChange={(e) => setCapacity(Number(e.target.value))} value={capacity} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default MySessions;
