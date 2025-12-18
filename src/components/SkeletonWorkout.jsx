function SkeletonWorkout() {
  return (
    <li
      style={{
        marginBottom: "1rem",
        backgroundColor: "#eee",
        padding: "1rem",
        borderRadius: "6px",
        boxShadow: "0 0 5px rgba(0,0,0,0.05)",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div
        style={{
          height: "16px",
          width: "60%",
          backgroundColor: "#ddd",
          marginBottom: "0.5rem",
          borderRadius: "4px",
        }}
      ></div>
      <div
        style={{
          height: "14px",
          width: "40%",
          backgroundColor: "#ddd",
          borderRadius: "4px",
        }}
      ></div>
    </li>
  );
}

export default SkeletonWorkout;
