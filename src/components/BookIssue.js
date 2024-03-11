import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookIssue() {
  const [books, setBooks] = useState([]);
  const [bookRefNo, setBookRefNo] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publication, setPublication] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [issuedDate, setIssuedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [idNumber, setIdNumber] = useState(""); // State for idNumber
  const [bookId, setBookId] = useState(0); // State for bookId
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book data
    fetch("http://localhost:8080/getBook/" + bookId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is a single book object
        // Set the book details
        setBookRefNo(data.bookRefNo);
        setTitle(data.title);
        setAuthor(data.author);
        setPublication(data.publication);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Fetch student data
    fetch("http://localhost:8080/getStudents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array of student objects
        // Set the students array
        setStudents(data);
        // Automatically select student based on idNumber
        const selectedStudent = data.find((student) => student.idNumber === parseInt(idNumber));
        if (selectedStudent) {
          setSelectedStudent(selectedStudent);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [bookId, idNumber]); // Trigger useEffect when bookId or idNumber changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const issueBook = {
      bookRefNo,
      title,
      author,
      publication,
      firstName: selectedStudent.firstName,
      lastName: selectedStudent.lastName,
      issuedDate,
      returnDate,
      idNumber,
      bookId,
    };

    // Send book data using fetch API
    fetch("http://localhost:8080/issueBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response
        console.log("Success:", data);
        setSuccessMessage("Book issued successfully"); // Set success message
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/"); // Navigate to home page after successful book issue
        }, 2000);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading" style={{ color: "red" }}>
        Issue Book
      </h1>
      <div className="formDiv" style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <form onSubmit={handleSubmit}>          
          <div className="form-group">
            <label>Book Id:</label>
            <input
              className="inputbox"
              type="number"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          {/* Remaining form fields */}
          <div className="form-group">
            <label>BookRefNo:</label>
            <input
              className="inputbox"
              type="text"
              value={bookRefNo}
              onChange={(e) => setBookRefNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="inputbox"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              className="inputbox"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Publication:</label>
            <input
              className="inputbox"
              type="text"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Id Number:</label>
            <input
              className="inputbox"
              type="number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Select Student:</label>
            <input
              className="inputbox"
              type="text"
              value={`${selectedStudent.firstName || ""} ${selectedStudent.lastName || ""}`}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Issued Date:</label>
            <input
              className="inputbox"
              required
              type="date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Return Date:</label>
            <input
              className="inputbox"
              required
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <div
            className="success-message"
            style={{
              fontSize: "18px",
              color: "darkgreen",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>          
          <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Issue Book
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
