import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '+91 98765 43210',
    bloodGroup: 'O+',
    city: '',
    pincode: '',
    lastDonationDate: '',
    locationCoords: '',
    consent: false,
  });
  const [locating, setLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setFormData((prev) => ({
        ...prev,
        city: prev.city || 'Bengaluru',
        pincode: prev.pincode || '560001',
        locationCoords: 'GPS Location Captured',
      }));
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          locationCoords: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        }));
        setLocating(false);
      },
      () => {
        setFormData((prev) => ({
          ...prev,
          locationCoords: 'Location enabled',
        }));
        setLocating(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('bloodlink_donor', JSON.stringify(formData));
    navigate('/donor-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] py-10 px-4 sm:px-6 flex justify-center font-sans">
      <div className="w-full max-w-[780px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0ECE6] p-7 sm:p-12">
        {/* Brand Header */}
        <Link
          to="/"
          className="inline-block text-xl font-bold tracking-tight text-[#181512] mb-6"
        >
          Blood<span className="text-[#D32724]">Link</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#181512] tracking-tight">
          Become a donor
        </h1>
        <p className="text-sm sm:text-base text-[#6B6661] mt-2">
          Takes two minutes. You can pause or delete your data anytime.
        </p>

        {/* 3-Step Progress Bar (2 Active Crimson Segments) */}
        <div className="grid grid-cols-3 gap-2.5 my-7">
          <div className="h-1.5 rounded-full bg-[#D32724]" />
          <div className="h-1.5 rounded-full bg-[#D32724]" />
          <div className="h-1.5 rounded-full bg-[#E5E2DC]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] placeholder-[#8C867E] focus:outline-none focus:border-[#D32724] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                Mobile number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] placeholder-[#8C867E] focus:outline-none focus:border-[#D32724] transition"
              />
            </div>
          </div>

          {/* Blood Group Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#181512] mb-2.5">
              Blood group
            </label>
            <div className="flex flex-wrap gap-2.5">
              {BLOOD_GROUPS.map((group) => {
                const isSelected = formData.bloodGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, bloodGroup: group })
                    }
                    className={`w-[72px] h-14 rounded-2xl text-sm font-bold transition cursor-pointer border ${
                      isSelected
                        ? 'bg-[#D32724] text-white border-[#D32724] shadow-sm'
                        : 'bg-white text-[#181512] border-[#E6E1DA] hover:border-[#C7C0B6]'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                City
              </label>
              <input
                type="text"
                required
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] placeholder-[#8C867E] focus:outline-none focus:border-[#D32724] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                Pincode
              </label>
              <input
                type="text"
                required
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] placeholder-[#8C867E] focus:outline-none focus:border-[#D32724] transition"
              />
            </div>
          </div>

          {/* Last Donation Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                Last donation date
              </label>
              <input
                type="date"
                value={formData.lastDonationDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastDonationDate: e.target.value,
                  })
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] focus:outline-none focus:border-[#D32724] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181512] mb-2">
                Location
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full px-4 py-3.5 rounded-xl border border-[#E6E1DA] text-left text-sm font-semibold text-[#D32724] hover:bg-[#FFF8F8] transition cursor-pointer"
              >
                {locating
                  ? 'Detecting location...'
                  : formData.locationCoords || 'Use my current location'}
              </button>
            </div>
          </div>

          {/* Consent Checkbox & Submit */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="flex items-start gap-2.5 text-xs text-[#6B6661] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) =>
                  setFormData({ ...formData, consent: e.target.checked })
                }
                className="mt-0.5 rounded border-[#D6D1C9] text-[#D32724] focus:ring-[#D32724]"
              />
              <span>
                I confirm I am 18–65 years old and agree to receive emergency
                blood donation alerts.
              </span>
            </label>

            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#D32724] hover:bg-[#B81E1B] text-white text-sm font-semibold transition cursor-pointer shrink-0"
            >
              Complete registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}