import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllReviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        setReviews(response.data);
      } catch (err) {
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      await axios.post(`http://localhost:5000/api/approveReview/${reviewId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      setReviews(reviews.map(review => 
        review._id === reviewId ? { ...review, approved: true } : review
      ));
    } catch (err) {
      setError('Failed to approve the review.');
    }
  };

  const handleUnapprove = async (reviewId) => {
    // console.log("22222---", reviewId)
    try {
      await axios.post(`http://localhost:5000/api/unapproveReview/${reviewId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      setReviews(reviews.map(review => 
        review._id === reviewId ? { ...review, approved: false } : review
      ));
    } catch (err) {
      setError('Failed to unapprove the review.');
    }
  };
  

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">All Reviews</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book </th>
            <th>User </th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              <td>{review.bookId.title || review.bookId}</td> {/* Adjust according to your data structure */}
              <td>{review.userId.name || review.userId}</td>   {/* Adjust according to your data structure */}
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>
                <span style={{
                  color: review.approved ? 'green' : 'orange',
                  fontWeight: 'bold'
                }}>
                  {review.approved ? 'Approved' : 'Pending Approval'}
                </span>
              </td>
              <td>
                {review.approved ? (
                  <Button 
                    variant="danger" 
                    onClick={() => handleUnapprove(review._id)}
                    style={{ marginRight: '10px' }}
                  >
                    Unapprove
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    onClick={() => handleApprove(review._id)}
                  >
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reviews;
