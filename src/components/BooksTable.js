import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateBookModal from './UpdateBookModal';
import Swal from 'sweetalert2';

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const[showUpdateModal, setShowUpdateModal] = useState(false)
  const[selectedBookId, setSelectedBookId] = useState('')
  const navigate = useNavigate(); 
    useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/books');
        setBooks(response.data.data); // Assuming the books are returned in data
        setLoading(false);
      } catch (error) {
        setError('Failed to load books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleDelete = (bookId) => {
    console.log("87878", bookId)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/api/admin/deletebook/${bookId}`)
                .then(response => {
                    Swal.fire(
                        'Deleted!',
                        'The book has been deleted.',
                        'success'
                    );
                    // Optionally reload the book list or remove the book from the UI
                })
                .catch(error => {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the book.',
                        'error'
                    );
                    console.error('Error deleting book:', error);
                });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'The book is safe :)',
                'info'
            );
        }
    });
};

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
  <h2 style={{ textAlign: 'center', flex: 1 }}>Books List</h2>
  <button onClick={() => navigate('/newbook')} style={{ marginLeft: 'auto' }}>Add New Book</button>
</div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Category</th>
            <th>Price</th>
            <th>Label</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.genre.join(', ')}</td>
              <td>{book.category}</td>
              <td>$ {book.price}</td>
              <td>{book.label}</td>
              <td>
              <button onClick={() => {
  setSelectedBookId(book._id); // Set the ID of the book you want to edit
  setShowUpdateModal(true); // Show the modal
}}>
  Edit
</button>                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showUpdateModal && (
  <UpdateBookModal 
    bookId={selectedBookId} 
    onClose={() => setShowUpdateModal(false)} 
  />
)}

    </div>
  );
};

export default BooksTable;
