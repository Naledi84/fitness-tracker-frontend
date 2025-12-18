import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });
  const [error, setError] = useState(null);

  const { login } = useAuth(); // from AuthContext
  const navigate = useNavigate(); // for redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Register response:", data);

      if (data.access) {
        // Save token in localStorage
        localStorage.setItem("token", data.access);

        // Update global auth state
        login({ username: formData.username, token: data.access });

        // Redirect to workouts
        navigate("/workouts");
      } else {
        setError("Registration failed. Please check your details.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
        />
        <input
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
        />
        <input
          name="goal"
          placeholder="Fitness Goal"
          value={formData.goal}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Register;
