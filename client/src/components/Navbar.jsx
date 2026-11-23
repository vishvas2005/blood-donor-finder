import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      pathname === path ? "text-red-600 font-semibold" : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
          BloodLink
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkClass("/")}>Find donors</Link>
          <Link to="/register-donor" className={linkClass("/register-donor")}>Become a donor</Link>
          <Link to="/my-requests" className={linkClass("/my-requests")}>My requests</Link>
          <Link to="/dashboard" className={linkClass("/dashboard")}>Donor dashboard</Link>
        </nav>

        <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}