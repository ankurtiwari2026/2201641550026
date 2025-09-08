import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForm.css";

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        register(username, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="auth-form__container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        {error && <p className="auth-form__error">{error}</p>}
        <p className="auth-form__switch">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
