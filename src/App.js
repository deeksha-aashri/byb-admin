import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminSignUp from './components/AdminSignUp';
import BookList from './components/BooksTable';
import AddBook from './components/AddBookModal';
import PrivateRoute from './components/PrivateRoute';
import AddBookModalComponent from './components/AddBookModal';
import SidebarComponent from './components/Sidebar'; // Import the SidebarComponent
import './App.css';
import '../src/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Reviews from './components/Reviews';
import Coupon from './components/Coupon'
// A wrapper component to conditionally render the sidebar
function LayoutWithSidebar({ children }) {
  const location = useLocation();

  // Define the paths where you don't want the sidebar to appear
  const noSidebarRoutes = ['/admin-login', '/admin-signup'];

  return (
    <div className="app-container">
      {/* Conditionally render SidebarComponent if not on login or signup routes */}
      {!noSidebarRoutes.includes(location.pathname) && <SidebarComponent />}
      <div className={`content-container ${!noSidebarRoutes.includes(location.pathname) ? 'with-sidebar' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWithSidebar>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Sign Up Route */}
          <Route path="/admin-signup" element={<AdminSignUp />} />

          {/* Private Routes */}
          <Route path="/books" element={<PrivateRoute element={<BookList />} />} />
          <Route path="/newbook" element={<PrivateRoute element={<AddBookModalComponent />} />} />
          <Route path="/add-book" element={<PrivateRoute element={<AddBook />} />} />

          {/* Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/admin-login" />} />

          <Route path="/orders" element={<Orders/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/coupon" element={<Coupon/>} />
        </Routes>
      </LayoutWithSidebar>
    </Router>
  );
}

export default App;
