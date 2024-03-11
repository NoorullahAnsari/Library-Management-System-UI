import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookList from "./BookList";

function BookDetails() {
  const { data: books, isPending, error } = useFetch("http://localhost:8080/getBooks"); 
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  useEffect(() => {
    if (books) {
      // Filter books based on search term
      const filteredBooks = books.filter(book => 
        book.bookRefNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filteredBooks);
    }
  }, [books, searchTerm]);

  const totalPages = Math.ceil((filteredBooks?.length || 0) / itemsPerPage);

  // Update filtered books based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredBooks.length);
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div className="container mt-5 mx-auto">
      <div className="grid justify-items-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-2xl">
          <div className="bg-primary text-center text-white py-3 px-4 rounded-t-lg">
            <h2 className="text-2xl text-red-900 font-bold">Book Details</h2>
          </div>
          <div className="p-4">
            {error && <div>{error}</div>}
            <div className="flex items-center mb-4">
              <input 
                type="text" 
                className="p-2 border rounded-md w-full mr-2" 
                placeholder="Search by Book Ref No, Title, or Author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {isPending && <div>Loading...</div>}
            {paginatedBooks.length > 0 && (
              <BookList books={paginatedBooks} />
            )}
            <div className="flex justify-between items-center mt-3">
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <div>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  if (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - currentPage) <= 1) {
                    return (
                      <button 
                        key={index} 
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (Math.abs(pageNumber - currentPage) === 2) {
                    return <span key={index}>...</span>;
                  }
                  return null;
                })}
              </div>
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoadMore} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
