import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/workouts/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:8000/api/workouts/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setWorkouts(workouts.filter((w) => w.id !== id));
      alert("Workout deleted!");
    } else {
      alert("Error deleting workout");
    }
  };

  return (
    <div>
      <h2>My Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>Date:</strong> {workout.date} |<strong> Duration:</strong>{" "}
            {workout.duration} mins |<strong> Calories:</strong>{" "}
            {workout.calories_burned}{" "}
            <Link to={`/workouts/${workout.id}/edit`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
