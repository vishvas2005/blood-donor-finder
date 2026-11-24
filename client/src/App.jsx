import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import DonorSignup from './pages/DonorSignup';
import DonorDashboard from './pages/DonorDashboard';
import CreateRequest from './pages/CreateRequest';
import MyRequests from './pages/MyRequests';
import TrackRequest from './pages/TrackRequest';
import AdminDashboard from './pages/AdminDashboard';

function AppLayout() {
  const location = useLocation();
  const hideGlobalNavbar = ['/login', '/donor-signup', '/donor-dashboard'].includes(
    location.pathname
  );

  return (
    <>
      {!hideGlobalNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-donor" element={<DonorSignup />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/track-request/:id" element={<TrackRequest />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}