import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookRegistration() {
  const [bookRefNo, setBookRefNo] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const [edition, setEdition] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [category, setCategory] = useState("");
  const [noOfCopies, setNoOfCopies] = useState("");
  const [publishedYearValid, setPublishedYearValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handlePublishedYearChange = (e) => {
    const year = e.target.value;
    const isValid = /^\d{4}$/.test(year);
    setPublishedYearValid(isValid);
    setPublishedYear(year);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      bookRefNo,
      isbn,
      title,
      author,
      publication,
      edition,
      publishedYear,
      category,
      noOfCopies: noOfCopies,
    };

    fetch("http://localhost:8080/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setSuccessMessage("Book registered successfully"); // Set success message
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/"); // Navigate to home page after 3 seconds
        }, 2000);
        // Clear form fields after successful registration
        setBookRefNo("");
        setISBN("");
        setTitle("");
        setAuthor("");
        setPublication("");
        setEdition("");
        setPublishedYear("");
        setCategory("");
        setNoOfCopies("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading" style={{ color: "red" }}>
        Book Registration
      </h1>
      <div className="formDiv" style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>BookRefNo:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={bookRefNo}
              onChange={(e) => setBookRefNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>ISBN:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={isbn}
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Publication:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Edition:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Published Year:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={publishedYear}
              onChange={handlePublishedYearChange} // Use custom handler
            />
            {!publishedYearValid && (
              <span style={{ color: "red" }}>Published Year must be a 4-digit number.</span>
            )}
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              className="inputbox"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Number Of Copies:</label>
            <input
              className="inputbox"
              type="number"
              required
              value={noOfCopies}
              onChange={(e) => setNoOfCopies(e.target.value)}
            />
          </div>
          {successMessage && (
            <div
              className="success-message"
              style={{ fontSize: "24px", textAlign: "center", marginBottom: "20px" }}
            >
              {successMessage}
            </div>
          )}
          <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Book Register
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
