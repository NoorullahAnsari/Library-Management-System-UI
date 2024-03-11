import { Link } from "react-router-dom";

export default function IssuedBookList({ issuedBooks }) {
  return (
    <div className="issuedBookList" style={{ textAlign: "center" }}>
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Book Reference No</th>
            <th>Title</th>
            <th>Publication</th>
            <th>Author</th>            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Issued Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((issuedBook, index) => (
            <tr key={index}>
              <td>{issuedBook.bookRefNo}</td>
              <td>{issuedBook.title}</td>
              <td>{issuedBook.publication}</td>
              <td>{issuedBook.author}</td>
              <td>{issuedBook.firstName}</td>
              <td>{issuedBook.lastName}</td>
              <td>{issuedBook.issuedDate}</td>
              <td>{issuedBook.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
