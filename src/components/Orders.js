import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [statusOptions] = useState(['Processing', 'Shipped', 'Delivered', 'Cancelled']);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getAllOrders'); // Adjust API route as needed
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Send a request to update the order status
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { order_status: newStatus });
      
      // Update the state to reflect the new status in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, order_status: newStatus } : order
        )
      );

      // Show success notification
      Swal.fire('Updated!', 'Order status has been updated.', 'success');
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire('Error!', 'There was an error updating the order status.', 'error');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      // Call the delete order API here using the orderId
      try {
        await axios.delete(`http://localhost:5000/api/deleteOrder/${orderId}`);
        Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
        
        // Refresh the orders list after deletion
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
        Swal.fire('Error!', 'There was an error deleting the order.', 'error');
      }
    }
  };

  // Function to handle view order
  const handleViewOrder = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/getOrderById/${id}`);
    setSelectedOrder(response.data); // Store the full order data
    setModalOpen(true);
  };

  return (
    <div className="orders-table-container">
      <h2>Orders</h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          className="orders-table"
          style={{ marginLeft: '90px', paddingLeft: '20px' }} // Added margin and padding
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>${order.totalAmount}</td>
                <td>{order.payment_status}</td>
                <td>
                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  <FaEye onClick={() => handleViewOrder(order._id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaTrash onClick={() => handleDeleteOrder(order._id)} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to display order details */}
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.name}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.payment_status}</p>
            <p><strong>Order Status:</strong> {selectedOrder.order_status}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
            <h4>Items:</h4>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item._id}>
                  {item.book_id.title} - Quantity: {item.quantity} - Price: ₹{item.price}
                </li>
              ))}
            </ul>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
