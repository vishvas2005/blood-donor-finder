import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      pathname === path
        ? "text-red-600 font-semibold"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
          BloodLink
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkClass("/")}>Find donors</Link>
          <Link to="/register-donor" className={linkClass("/register-donor")}>Become a donor</Link>
          <Link to="/my-requests" className={linkClass("/my-requests")}>My requests</Link>
          <Link to="/dashboard" className={linkClass("/dashboard")}>Donor dashboard</Link>
          <Link to="/admin" className={linkClass("/admin")}>Admin</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/create-request"
            className="text-sm font-medium text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-lg transition"
          >
            + Post request
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition"
          >
            Log in
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 flex flex-col">
          <Link to="/" onClick={() => setMobileOpen(false)} className={linkClass("/")}>Find donors</Link>
          <Link to="/register-donor" onClick={() => setMobileOpen(false)} className={linkClass("/register-donor")}>Become a donor</Link>
          <Link to="/my-requests" onClick={() => setMobileOpen(false)} className={linkClass("/my-requests")}>My requests</Link>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className={linkClass("/dashboard")}>Donor dashboard</Link>
          <Link to="/admin" onClick={() => setMobileOpen(false)} className={linkClass("/admin")}>Admin</Link>
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            <Link
              to="/create-request"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-medium text-red-600 bg-red-50 py-2 rounded-lg"
            >
              + Post request
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-sm font-medium bg-gray-900 text-white py-2 rounded-lg"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}