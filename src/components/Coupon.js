import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ name: '', code: '', discount: '' });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/getAllCoupons');
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const deleteCoupon = async (code) => {
   
    try {
      await axios.delete(`http://localhost:5000/api/admin/deletecoupon/${code}`);
      setCoupons(coupons.filter(coupon => coupon.code !== code));
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleAddCoupon = async () => {
   
    try {
      const response = await axios.post('http://localhost:5000/api/admin/addCoupon', newCoupon);
      setCoupons([...coupons, response.data.coupon]);
      setShowModal(false);
      setNewCoupon({ name: '', code: '', discount: '' });
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  return (
    <div className="coupon-component">
      <h2 className="coupon-title">Coupons</h2>
      <button className="coupon-add-btn" onClick={() => setShowModal(true)}>
        Add New Coupon
      </button>
      <table className="coupon-table">
        <thead>
          <tr>
            <th className="coupon-header">Name</th>
            <th className="coupon-header">Code</th>
            <th className="coupon-header">Discount </th>
            <th className="coupon-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.code}>
              <td className="coupon-cell">{coupon.name}</td>
              <td className="coupon-cell">{coupon.code}</td>
              <td className="coupon-cell">{coupon.discount}</td>
              <td className="coupon-cell">
                <button
                  className="coupon-delete-btn"
                  onClick={() => deleteCoupon(coupon.code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="coupon-modal-overlay">
          <div className="coupon-modal">
            <h3 className="coupon-modal-title">Add New Coupon</h3>
            <label className="coupon-label">
              Name:
              <input
                type="text"
                className="coupon-input"
                value={newCoupon.name}
                onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
              />
            </label>
            <label className="coupon-label">
              Code:
              <input
                type="text"
                className="coupon-input"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              />
            </label>
            <label className="coupon-label">
              Discount :
              <input
                type="number"
                className="coupon-input"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              />
            </label>
            <button className="coupon-save-btn" onClick={handleAddCoupon}>Save</button>
            <button className="coupon-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
