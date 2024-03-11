import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import BookRegistration from "./components/BookRegistration";
import StudentRegistration from "./components/StudentRegistration";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import "./App.css";
import BookIssue from "./components/BookIssue";
import IssuedBookDetails from "./components/IssuedBookDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="scrollable-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookRegistration" element={<BookRegistration />} />
            <Route path="/bookIssue" element={<BookIssue />} />
            <Route path="/IssuedBookDetails/" element={<IssuedBookDetails />} />
            <Route path="/bookDetails/" element={<BookDetails />} />
            <Route path="/studentRegistration" element={<StudentRegistration />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
