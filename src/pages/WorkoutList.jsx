import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressChart from "./ProgressChart";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/workouts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Network error while loading workouts.");
      const data = await res.json();
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load workouts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/workouts/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
      alert("Workout deleted!");
    } catch (err) {
      alert("Error deleting workout. Please try again.");
    }
  };

  return (
    <div>
      <h2>My Workouts</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading workouts...</p>}

      {!loading && workouts.length === 0 && !error && (
        <p>No workouts found. Add your first one!</p>
      )}

      {!loading && workouts.length > 0 && (
        <>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id} style={{ marginBottom: "0.5rem" }}>
                <strong>Date:</strong> {workout.date} |
                <strong> Duration:</strong> {workout.duration} mins |
                <strong> Calories:</strong> {workout.calories_burned}{" "}
                <Link to={`/workouts/${workout.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(workout.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Progress chart below the list */}
          <div style={{ marginTop: "2rem" }}>
            <ProgressChart workouts={workouts} />
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutList;
