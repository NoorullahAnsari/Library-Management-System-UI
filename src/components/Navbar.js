// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../library-logo.jpg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={logoImage} alt="Logo" style={{ width: "90px" }} />
      <div className="links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/bookIssue" className="nav-link">Book Issue</Link>
        <Link to="/issuedBookDetails" className="nav-link">Issued Books</Link>
        <Link to="/bookDetails" className="nav-link">Book Details</Link>
        <Link to="/bookRegistration" className="nav-link">Book Registration</Link>
        <Link to="/studentRegistration" className="nav-link">Student Registration</Link>
      </div>
    </nav>
  );
}
