import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ workouts }) => {
  // Labels: workout dates
  const labels = workouts.map((w) =>
    new Date(w.date).toLocaleDateString("en-GB")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Calories Burned",
        data: workouts.map((w) => w.calories_burned),
        borderColor: "#00bcd4",
        backgroundColor: "#0097a7",
        tension: 0.3,
      },
      {
        label: "Duration (mins)",
        data: workouts.map((w) => w.duration),
        borderColor: "#ff9800",
        backgroundColor: "#f57c00",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Workout Progress Over Time",
        font: { size: 18 },
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>Progress Tracking</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
