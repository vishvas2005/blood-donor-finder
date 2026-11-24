import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('98765 43210');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!otpSent || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-navigate once all 6 digits are entered
    if (digit && index === 5 && updated.every((d) => d !== '')) {
      localStorage.setItem('bloodlink_phone', `+91 ${phone}`);
      setTimeout(() => navigate('/donor-dashboard'), 300);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const updated = [...otp];
    pasted.split('').forEach((char, idx) => {
      updated[idx] = char;
    });
    setOtp(updated);
    const nextIdx = Math.min(pasted.length, 5);
    inputRefs.current[nextIdx]?.focus();
    if (pasted.length === 6) {
      localStorage.setItem('bloodlink_phone', `+91 ${phone}`);
      setTimeout(() => navigate('/donor-dashboard'), 300);
    }
  };

  const formattedTimer = `0:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Dark Branding Panel */}
      <div className="lg:w-1/2 bg-[#14110F] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
        <div>
          <Link to="/" className="text-xl font-bold tracking-tight">
            Blood<span className="text-[#D32724]">Link</span>
          </Link>
        </div>

        <div className="my-12 lg:my-0 max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight mb-6">
            Every request deserves a fast answer.
          </h1>
          <p className="text-[#A8A29E] text-base sm:text-lg leading-relaxed">
            Verify your phone number once. Donors are alerted by push and SMS
            the moment a nearby request opens.
          </p>
        </div>

        <div className="hidden lg:block" />
      </div>

      {/* Right Light Auth Card Panel */}
      <div className="lg:w-1/2 bg-[#FBF9F6] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F0ECE6] p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#181512] tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-[#6B6661] mt-1.5 mb-7">
            Log in with a one-time password.
          </p>

          <form onSubmit={handleSendOtp}>
            <label className="block text-xs font-semibold text-[#181512] mb-2">
              Mobile number
            </label>
            <div className="flex gap-2.5 mb-5">
              <div className="px-4 py-3 rounded-xl border border-[#E6E1DA] bg-white text-sm font-semibold text-[#181512] select-none">
                +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                className="flex-1 px-4 py-3 rounded-xl border border-[#E6E1DA] text-sm text-[#181512] placeholder-[#9C968F] focus:outline-none focus:border-[#D32724] transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#D32724] hover:bg-[#B81E1B] text-white text-sm font-semibold transition cursor-pointer shadow-sm"
            >
              Send OTP
            </button>
          </form>

          {/* 6-Digit OTP Input Boxes */}
          <div className="mt-7">
            <label className="block text-xs font-semibold text-[#181512] mb-2.5">
              Enter 6-digit code
            </label>
            <div
              className="grid grid-cols-6 gap-2 sm:gap-2.5"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  aria-label={`Digit ${index + 1}`}
                  className="w-full aspect-square rounded-xl bg-[#0D0B0A] text-white text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#D32724] transition"
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              {timer > 0 ? (
                <span className="text-[#57534E] font-medium">
                  Resend code in {formattedTimer}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#D32724] font-semibold hover:underline cursor-pointer"
                >
                  Resend code
                </button>
              )}
              {otp.some((d) => d !== '') && (
                <button
                  type="button"
                  onClick={() => navigate('/donor-dashboard')}
                  className="text-[#181512] font-semibold hover:underline cursor-pointer"
                >
                  Verify &rarr;
                </button>
              )}
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-[#6B6661]">
            New here?{' '}
            <Link
              to="/donor-signup"
              className="text-[#D32724] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}