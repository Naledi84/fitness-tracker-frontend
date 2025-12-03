import { useState } from "react";

function WorkoutAdd() {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    calories_burned: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/api/workouts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Workout added!");
      setFormData({ date: "", duration: "", calories_burned: "" });
    } else {
      alert("Error adding workout");
    }
  };

  return (
    <div>
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="calories_burned"
          placeholder="Calories Burned"
          value={formData.calories_burned}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
}

export default WorkoutAdd;
