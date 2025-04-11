import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "80dvh",
        display: "grid",
        placeItems: "center",
        padding: "0 16px",
        margin: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "rgb(10, 12, 48)",
            maxWidth: "900px",
            lineHeight: "1.4",
            margin: 0,
          }}
        >
          Automated Web-Based System for Course and Program Outcome Tracking and
          Analysis
        </h1>
        <p
          style={{
            marginTop: "24px",
            fontSize: "25px",
            color: "#666",
          }}
        >
          Made by: Tejeswar, Rigved, Srishti, Nishant, Shivarth, Kartik
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
