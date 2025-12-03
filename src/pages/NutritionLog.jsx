import { useState, useEffect } from "react";

function NutritionLog() {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    meal: "",
    calories: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/nutrition/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/api/nutrition/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newLog = await response.json();
      setLogs([...logs, newLog]);
      setFormData({ date: "", meal: "", calories: "" });
      alert("Nutrition log added!");
    } else {
      alert("Error adding nutrition log");
    }
  };

  return (
    <div>
      <h2>Nutrition Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          name="meal"
          placeholder="Meal description"
          value={formData.meal}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Meal</button>
      </form>

      <h3>My Meals</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.date}</strong> – {log.meal} ({log.calories} cal)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NutritionLog;
