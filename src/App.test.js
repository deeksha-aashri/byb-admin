import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/components/AdminLogin';
import AdminBooks from './admin/pages/AdminBooks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/books" element={<AdminBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
