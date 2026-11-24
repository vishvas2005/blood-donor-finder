import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DonorDashboard() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);
  const [donor, setDonor] = useState({
    bloodGroup: 'O-',
    city: '[City]',
    pincode: '[Pincode]',
    lastDonationDate: '',
  });
  const [updatingGps, setUpdatingGps] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bloodlink_donor');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDonor((prev) => ({
          ...prev,
          bloodGroup: parsed.bloodGroup || prev.bloodGroup,
          city: parsed.city || prev.city,
          pincode: parsed.pincode || prev.pincode,
          lastDonationDate: parsed.lastDonationDate || '',
        }));
      } catch {
        // Fallback to default state
      }
    }
  }, []);

  const calculateEligibility = () => {
    if (!donor.lastDonationDate) {
      return {
        formattedDate: '[DD MMM YYYY]',
        daysRemaining: 0,
        eligible: true,
        segmentsFilled: 5,
      };
    }

    const lastDate = new Date(donor.lastDonationDate);
    const today = new Date();
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 90 - diffDays);
    const progress = Math.min(5, Math.max(1, Math.round((diffDays / 90) * 5)));

    return {
      formattedDate: lastDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      daysRemaining,
      eligible: daysRemaining === 0,
      segmentsFilled: daysRemaining === 0 ? 5 : progress,
    };
  };

  const eligibility = calculateEligibility();

  const handleUpdateGps = () => {
    setUpdatingGps(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDonor((prev) => ({
            ...prev,
            city: `${pos.coords.latitude.toFixed(2)}°N`,
            pincode: `${pos.coords.longitude.toFixed(2)}°E`,
          }));
          setUpdatingGps(false);
        },
        () => setUpdatingGps(false)
      );
    } else {
      setTimeout(() => setUpdatingGps(false), 500);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] py-6 px-4 sm:px-8 font-sans">
      <div className="max-w-[1160px] mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#181512] tracking-tight mb-7">
          Donor dashboard
        </h1>

        {/* Availability Toggle Card */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0ECE6] p-6 sm:p-7 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#D32724] text-white flex items-center justify-center text-xl font-bold shrink-0">
              {donor.bloodGroup}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#181512]">
                {available ? 'Available to Donate' : 'Unavailable to Donate'}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6661] mt-0.5">
                {available
                  ? 'You will receive alerts for nearby requests.'
                  : 'Alerts are paused until you switch availability back on.'}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={available}
            onClick={() => setAvailable(!available)}
            className={`w-16 h-9 rounded-full p-1 transition-colors duration-200 cursor-pointer shrink-0 ${
              available ? 'bg-[#D32724]' : 'bg-[#D6D1C9]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                available ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Middle 2-Column Grid: 90-Day Eligibility & Saved Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 90-Day Eligibility Card */}
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0ECE6] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#181512]">
                  90-day eligibility
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    eligibility.eligible
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#FEF3C7] text-[#B45309]'
                  }`}
                >
                  {eligibility.eligible ? 'Eligible' : 'Cooling period'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6661] mt-3">
                Last donation: {eligibility.formattedDate}
              </p>

              {/* 5-Segment Progress Bar */}
              <div className="grid grid-cols-5 gap-2 my-5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full ${
                      step <= eligibility.segmentsFilled
                        ? 'bg-[#D32724]'
                        : 'bg-[#E5E2DC]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#181512]">
              {eligibility.daysRemaining} days until next donation
            </p>
          </div>

          {/* Saved Location Card */}
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0ECE6] p-6 sm:p-7 flex flex-col justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#181512] mb-4">
              Saved location
            </h3>

            {/* Map Preview Box with Red Pin */}
            <div className="w-full h-24 rounded-2xl bg-[#EAEAEA] flex items-center justify-center relative overflow-hidden mb-4">
              <span className="w-4 h-4 rounded-full bg-[#D32724] ring-4 ring-white shadow" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#6B6661]">
                {donor.city}, {donor.pincode} &middot; approximate only
              </p>

              <button
                type="button"
                onClick={handleUpdateGps}
                className="px-4 py-2 rounded-full bg-[#181512] hover:bg-[#2E2924] text-white text-xs font-semibold transition cursor-pointer shrink-0"
              >
                {updatingGps ? 'Updating...' : 'Update GPS'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Card: Past Donations */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0ECE6] p-6 sm:p-7">
          <h3 className="text-base sm:text-lg font-bold text-[#181512]">
            Past donations
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6661] mt-2">
            No recorded donations yet. Your completed donations will appear
            here.
          </p>
        </div>
      </div>
    </div>
  );
}