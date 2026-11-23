import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `text-sm transition ${
      pathname === path
        ? "text-[#18181B] font-semibold"
        : "text-[#374151] font-medium hover:text-[#18181B]"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-5">
      <header className="bg-white rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-black/[0.04] flex items-center justify-between">
        {/* Brand Logo: Blood (Black) + Link (Red) */}
        <Link to="/" className="text-lg font-extrabold tracking-tight">
          <span className="text-[#18181B]">Blood</span>
          <span className="text-[#D92D20]">Link</span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass("/")}>
            Find donors
          </Link>
          <Link to="/register-donor" className={linkClass("/register-donor")}>
            Become a donor
          </Link>
          <Link to="/my-requests" className={linkClass("/my-requests")}>
            My requests
          </Link>
        </nav>

        {/* Right Black Pill Button */}
        <Link
          to="/login"
          className="bg-[#18181B] hover:bg-black text-white text-sm font-semibold px-5 py-2 rounded-full transition"
        >
          Log in
        </Link>
      </header>
    </div>
  );
}