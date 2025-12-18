import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
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
        <img src={logo} alt="Fitness Tracker Logo" className="logo" />
        <h1>Fitness Tracker</h1>
        <nav>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/workouts">My Workouts</NavLink>
          <NavLink to="/add-workout">Add Workout</NavLink>
          <NavLink to="/nutrition">Nutrition Log</NavLink>
          <NavLink to="/exercises">Exercises</NavLink>
        </nav>
      </header>

      {/* Animated content wrapper */}
      <main className="page-content">
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

export default App;
