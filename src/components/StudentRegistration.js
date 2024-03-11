import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [terminatedDate, setTerminatedDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      firstName,
      lastName,
      email,
      address,
      telephoneNo: telephoneNumber, // Assuming the API expects 'telephoneNo' instead of 'telephoneNumber'
      registeredDate,
      terminatedDate,
    };

    // Send student data using fetch API
    fetch('http://localhost:8080/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle success response
      console.log('Success:', data);
      setSuccessMessage("Student registered successfully");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading" style={{ color: "red" }}>
        Student Registration
      </h1>
      <div className="formDiv" style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              className="inputbox"
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              className="inputbox"
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="inputbox"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              className="inputbox"
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Telephone Number:</label>
            <input
              className="inputbox"
              required
              type="number"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Registered Date:</label>
            <input
              className="inputbox"
              required
              type="date"
              value={registeredDate}
              onChange={(e) => setRegisteredDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Terminated Date:</label>
            <input
              className="inputbox"
              required
              type="date"
              value={terminatedDate}
              onChange={(e) => setTerminatedDate(e.target.value)}
            />
          </div>
          {successMessage && (
            <div
              className="success-message"
              style={{
                textAlign: "center",
                backgroundColor: "green",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                color: "white",
              }}
            >
              {successMessage}
            </div>
          )}
          <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Student Registration
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
