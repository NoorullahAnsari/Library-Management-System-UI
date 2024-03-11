import React from 'react';
import libraryImage1 from "../assets/libraryImage1.jfif"; // Import your library images here
import libraryImage4 from "..//assets/libraryImage4.jfif";
import libraryImage3 from "../assets/libraryImage3.jfif";


export default function Home() {

  return (
    <div className="homePage">
      <div className="heading" style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "darkred" }}>Welcome to Your Library Management System</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "20px", maxWidth: "800px", margin: "auto" }}>
          Manage your library collection efficiently with our intuitive and easy-to-use library management system. 
          Keep track of your books, manage borrower information, and streamline library operations with our advanced features.
        </p>
      </div>

      <div className="imageContainer" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <img src={libraryImage1} alt="Library" style={{ width: "300px", height: "200px", margin: "10px", borderRadius: "10px" }} />
        <img src={libraryImage4} alt="Library" style={{ width: "300px", height: "200px", margin: "10px", borderRadius: "10px" }} />
        <img src={libraryImage3} alt="Library" style={{ width: "300px", height: "200px", margin: "10px", borderRadius: "10px" }} />
      </div>
    </div>
  );
}
