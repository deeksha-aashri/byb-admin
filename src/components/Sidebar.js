import React, { useState } from 'react';

const SidebarComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  };

  return (
    <div className={`sidebar-layout`}>
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <button onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? '✖' : '☰'} {/* Show hamburger menu when collapsed */}
        </button>
        {isOpen && (
          <ul>
            <li><a href="/books">Books</a></li>
            <li><a href="/newbook">Add New Book</a></li>
            <li><a href="/admin-signup">Admin Sign Up</a></li>
            <li><a href="/admin-login">Admin Login</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/customers">Customers</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/coupon">Coupons</a></li>
            <li onClick={handleLogout}><a>Admin Logout</a></li>
          </ul>
        )}
      </div>
      <div className={`content ${isOpen ? 'shifted' : 'full-width'}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarComponent;
