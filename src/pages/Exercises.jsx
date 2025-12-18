import React, { useEffect, useState } from "react";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to strip HTML tags from WGER descriptions
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        // language=2 → English entries
        const res = await fetch("https://wger.de/api/v2/exercise/?language=2");
        if (!res.ok) throw new Error("Network error while loading exercises.");
        const data = await res.json();
        const results = Array.isArray(data.results) ? data.results : [];
        setExercises(results);
      } catch (err) {
        setError("Failed to load exercises. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filtered = exercises.filter((ex) =>
    ex.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>Exercise Library (WGER API)</h2>

      <input
        type="text"
        placeholder="Search exercises by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          margin: "0.5rem 0 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading exercises...</p>}

      {!loading && filtered.length === 0 && !error && (
        <p>No exercises match your search.</p>
      )}

      {!loading && filtered.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((ex) => (
            <li
              key={ex.id}
              style={{
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{ex.name}</strong>
              <p style={{ marginTop: "0.25rem", color: "#555" }}>
                {stripHtml(ex.description) || "No description available."}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Exercises;
