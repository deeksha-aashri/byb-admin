import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AddBookModal = () => {
  const navigate = useNavigate(); 
  const [onSale, setOnSale] = useState(false); // New state for On Sale
  const [bestSeller, setBestSeller] = useState(false); // New state for Best Seller
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    genre: '',
    author: '',
    yearOfPublication: '',
    publisher: '',
    language: '',
    category: '',
    stock: '',
    description: '',
    sku: '',
    coverImage: null,
    onSale: false,       // Added onSale field
    bestSeller: false   
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.price || !formData.sku) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    const bookData = new FormData();
    for (const key in formData) {
      bookData.append(key, formData[key]);
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/addbook', bookData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Book Added',
          text: 'The book has been successfully added!',
        }).then(() => {
          navigate('/books'); // Redirect to the books page
        });
      }
    } catch (error) {
      console.error('Error adding book:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error adding the book.',
      });
    }
  };

  return (
    <div className="add-book-modal">
      <h1 className="modal-heading">Let’s Add a New Book!</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-row">
          <label htmlFor="title">
            Title <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">
            Price <span className="required-asterisk">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            placeholder="Genre (comma-separated)"
          />
        </div>
        <div className="form-row">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author"
          />
        </div>
        <div className="form-row">
          <label htmlFor="yearOfPublication">Year of Publication</label>
          <input
            type="number"
            id="yearOfPublication"
            name="yearOfPublication"
            value={formData.yearOfPublication}
            onChange={handleInputChange}
            placeholder="Year of Publication"
          />
        </div>
        <div className="form-row">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            placeholder="Publisher"
          />
        </div>
        <div className="form-row">
          <label htmlFor="language">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            placeholder="Language"
          />
        </div>
        <div className="form-row">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
        </div>
        <div className="form-row">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
        <div className="form-row">
          <label htmlFor="sku">
            SKU <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            required
          />
        </div>
        
        <div className="form-row">
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} />
        </div>
        <div className="form-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
  <label htmlFor="onSale" style={{ marginRight: '10px' }}>On Sale</label>
  <input
    type="checkbox"
    id="onSale"
    name="onSale"
    checked={formData.onSale}
    onChange={handleSwitchChange}
  />
</div>

<div className="form-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
  <label htmlFor="bestSeller" style={{ marginRight: '10px' }}>Best Seller</label>
  <input
    type="checkbox"
    id="bestSeller"
    name="bestSeller"
    checked={formData.bestSeller}
    onChange={handleSwitchChange}
  />
</div>




        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookModal;
