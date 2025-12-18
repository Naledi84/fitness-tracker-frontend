import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkoutList from "./pages/WorkoutList";
import WorkoutAdd from "./pages/WorkoutAdd";
import logo from "./assets/logo (3).png";
import WorkoutEdit from "./pages/WorkoutEdit";
import NutritionLog from "./pages/NutritionLog";
import Exercises from "./pages/Exercises";

function App() {
  return (
    <Router>
      <header>
        <img src={logo} alt="Fitness Tracker Logo" width="100" />
        <h1>Fitness Tracker</h1>
        <nav>
          <Link to="/register">Register</Link> |<Link to="/login">Login</Link> |
          <Link to="/workouts">My Workouts</Link> |
          <Link to="/add-workout">Add Workout</Link> |
          <Link to="/nutrition">Nutrition Log</Link>
          <Link to="/exercises">Exercises</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/add-workout" element={<WorkoutAdd />} />
          <Route path="/workouts/:id/edit" element={<WorkoutEdit />} />
          <Route path="/nutrition" element={<NutritionLog />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </main>
    </Router>
  );
}
