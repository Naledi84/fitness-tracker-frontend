import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressChart from "./ProgressChart";
import BarChart from "./BarChart";
import Spinner from "../components/Spinner";
import SkeletonWorkout from "../components/SkeletonWorkout";

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

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "1rem",
            borderRadius: "6px",
            margin: "1rem 0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <ul style={{ padding: 0 }}>
          {[...Array(3)].map((_, i) => (
            <SkeletonWorkout key={i} />
          ))}
        </ul>
      )}

      {!loading && workouts.length === 0 && !error && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          No workouts found. Add your first one!
        </p>
      )}

      {!loading && workouts.length > 0 && (
        <>
          <ul style={{ padding: 0 }}>
            {workouts.map((workout) => (
              <li
                key={workout.id}
                style={{
                  marginBottom: "1rem",
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "6px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                }}
              >
                <p>
                  <strong>Date:</strong> {workout.date} |{" "}
                  <strong>Duration:</strong> {workout.duration} mins |{" "}
                  <strong>Calories:</strong> {workout.calories_burned}
                </p>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link
                    to={`/workouts/${workout.id}/edit`}
                    style={{
                      marginRight: "1rem",
                      color: "#00bcd4",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    style={{
                      backgroundColor: "#c62828",
                      color: "white",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "2rem" }}>
            <ProgressChart workouts={workouts} />
            <BarChart workouts={workouts} />
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutList;
