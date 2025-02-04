import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const payload =
        method === "login"
          ? { username, password }
          : { username, email, password };

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (method === "login" && error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          alert("User not found. Redirecting to registration...");
          navigate("/register");
        } else {
          alert(error.response.data.detail || "Login failed.");
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      {method === "register" && (
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      )}
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>

      {method === "login" ? (
        <p className="register-text">
          Not a member yet?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      ) : (
        <p className="register-text">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      )}
    </form>
  );
}

export default Form;
