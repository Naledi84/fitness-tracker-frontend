import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function WorkoutEdit() {
  const { id } = useParams(); // workout ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    calories_burned: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/workouts/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`http://127.0.0.1:8000/api/workouts/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Workout updated!");
      navigate("/workouts");
    } else {
      alert("Error updating workout");
    }
  };

  return (
    <div>
      <h2>Edit Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calories_burned"
          value={formData.calories_burned}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default WorkoutEdit;
