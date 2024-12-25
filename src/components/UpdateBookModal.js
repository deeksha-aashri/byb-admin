import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBookModal = ({ bookId, onClose }) => {
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
    coverImage: '', 
    onSale: false,
    bestSeller: false   
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/book/${bookId}`);
        const book = response.data;
        setFormData({
          title: book.title,
          price: book.price,
          genre: book.genre.join(', '),
          author: book.author,
          yearOfPublication: book.yearOfPublication,
          publisher: book.publisher,
          language: book.language,
          category: book.category,
          stock: book.stock,
          description: book.description,
          sku: book.sku,
          coverImage: [],
          onSale: book.onSale,
          bestSeller: book.bestSeller   
        });
      } catch (error) {
        console.error('Error loading book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, coverImage: files });
  };
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBookData = new FormData();
    for (const key in formData) {
      if (key === 'coverImage' && formData?.coverImage.length) {
        formData?.coverImage.forEach((file) => {
          updatedBookData.append('coverImage', file);
        });
      } else if (key === 'onSale' || key === 'bestSeller') {
        updatedBookData.append(key, formData[key] ? 'true' : 'false');
      } else {
        updatedBookData.append(key, formData[key]);
      }
    }
    

    try {
      const response = await axios.put(`http://localhost:5000/api/admin/updatebook/${bookId}`, updatedBookData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire('Success!', 'Book updated successfully!', 'success').then(() => {
        onClose();
      });
    } catch (error) {
      console.error('Error updating book:', error);
      Swal.fire('Error!', 'Failed to update the book. Please try again.', 'error');
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGenre">
            <Form.Label>Genre *</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label>Author *</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formYearOfPublication">
            <Form.Label>Year of Publication</Form.Label>
            <Form.Control
              type="number"
              name="yearOfPublication"
              value={formData.yearOfPublication}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formSKU">
            <Form.Label>SKU *</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSwitches" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Form.Check 
              type="checkbox" 
              id="onSale" 
              name="onSale" 
              label="On Sale" 
              checked={formData.onSale} 
              onChange={handleSwitchChange} 
            />
            <Form.Check 
              type="checkbox" 
              id="bestSeller" 
              name="bestSeller" 
              label="Best Seller" 
              checked={formData.bestSeller} 
              onChange={handleSwitchChange} 
            />
          </Form.Group>

          <Form.Group controlId="formCoverImage">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              type="file"
              name="coverImage"
              onChange={handleFileChange}
            />
          </Form.Group>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="primary" type="submit">
              Update Book
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateBookModal;
