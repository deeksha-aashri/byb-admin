import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerComponent = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/usersGetAll'); // Update with actual API endpoint
        setCustomers(response.data.users);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customer-table">
      <h2 style={{textAlign:"center"}}>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined On</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name || 'N/A'}</td>
              <td>{customer.email || 'N/A'}</td>
              <td>{customer.contactNumber || 'N/A'}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerComponent;
