import { Link } from "react-router-dom";

export default function BookList({ books }) {
  return (
    <div className="bookList" style={{ textAlign: "center" }}>
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Book Reference No</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publication</th>
            <th>Edition</th>
            <th>Published Year</th>
            <th>Number of Copies</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.bookRefNo}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publication}</td>
              <td>{book.edition}</td>
              <td>{book.publishedYear}</td>
              <td>{book.noOfCopies}</td>
              <td>{book.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
