import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkoutList from "./pages/WorkoutList";
import WorkoutAdd from "./pages/WorkoutAdd";
import WorkoutEdit from "./pages/WorkoutEdit";
import NutritionLog from "./pages/NutritionLog";
import Exercises from "./pages/Exercises";

import logo from "./assets/logo (3).png";

// Small component for Logout button
function LogoutButton() {
  const { logout, user } = useAuth();

  if (!user) return null;

  return (
    <button
      onClick={logout}
      style={{
        backgroundColor: "#c62828",
        color: "white",
        padding: "0.4rem 0.8rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Logout
    </button>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <header>
          <img src={logo} alt="Fitness Tracker Logo" className="logo" />
          <h1>Fitness Tracker</h1>

          {/* Flex container for nav + logout */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            <nav style={{ display: "flex", gap: "0.75rem" }}>
              <NavLink to="/register">Register</NavLink>
              <span className="separator"> | </span>
              <NavLink to="/login">Login</NavLink>
              <span className="separator"> | </span>
              <NavLink to="/workouts">My Workouts</NavLink>
              <span className="separator"> | </span>
              <NavLink to="/add-workout">Add Workout</NavLink>
              <span className="separator"> | </span>
              <NavLink to="/nutrition">Nutrition Log</NavLink>
              <span className="separator"> | </span>
              <NavLink to="/exercises">Exercises</NavLink>
            </nav>

            {/* Logout floats right */}
            <div style={{ marginLeft: "auto" }}>
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="page-content">{/* Routes remain the same */}</main>
      </Router>
    </AuthProvider>
  );
}


export default App;
