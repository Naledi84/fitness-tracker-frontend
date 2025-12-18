import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ workouts }) => {
  const labels = workouts.map((w) =>
    new Date(w.date).toLocaleDateString("en-GB")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sets",
        data: workouts.map((w) => w.sets || 0),
        backgroundColor: "#42a5f5",
      },
      {
        label: "Reps",
        data: workouts.map((w) => w.reps || 0),
        backgroundColor: "#66bb6a",
      },
      {
        label: "Weight (kg)",
        data: workouts.map((w) => w.weight || 0),
        backgroundColor: "#ef5350",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Workout Metrics (Sets, Reps, Weight)",
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
      <h2 style={{ textAlign: "center" }}>Workout Metrics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
