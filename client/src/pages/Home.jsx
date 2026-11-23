import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, ShieldCheck, ArrowRight } from "lucide-react";
import DonorMap from "../components/DonorMap";
import { mockDonors } from "../utils/mockData";

const BLOOD_GROUPS = ["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Home() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("O-");
  const [radiusKm, setRadiusKm] = useState(5);
  const [center, setCenter] = useState([26.2183, 78.1828]); // Default [lat, lng]
  const [locationLabel, setLocationLabel] = useState("Current location");

  const handleUseGPS = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setLocationLabel("GPS Location Active");
      },
      () => alert("Location permission denied")
    );
  };

  // Filter donors by blood group & radius
  const filteredDonors = mockDonors.filter((d) => {
    const groupMatch =
      selectedGroup === "ALL" || d.bloodGroup === selectedGroup;
    const radiusMatch = d.distanceKm <= radiusKm;
    return groupMatch && radiusMatch && d.isAvailable;
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero + Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            Live donor matching
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
            Blood, found in <span className="text-red-600">minutes.</span>
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            We match compatible, eligible donors by distance and alert them
            instantly. Contact details stay private until they accept.
          </p>

          {/* Search Bar Card */}
          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap sm:flex-nowrap items-center gap-2">
            {/* Blood Group */}
            <div className="flex-1 min-w-[110px] px-2">
              <label className="block text-[11px] font-medium text-gray-400">
                Blood group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full font-bold text-gray-900 bg-transparent focus:outline-none text-sm mt-0.5"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Location */}
            <div className="flex-1 min-w-[150px] px-2">
              <label className="block text-[11px] font-medium text-gray-400">
                Location
              </label>
              <button
                type="button"
                onClick={handleUseGPS}
                className="flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-red-600 mt-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {locationLabel}
              </button>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Radius */}
            <div className="w-24 px-2">
              <label className="block text-[11px] font-medium text-gray-400">
                Radius
              </label>
              <select
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-full font-semibold text-gray-900 bg-transparent focus:outline-none text-sm mt-0.5"
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {}}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          <div className="pt-1">
            <Link
              to="/create-request"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Need blood urgently? Post a request
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Side Live Map */}
        <div className="lg:col-span-6">
          <DonorMap
            center={center}
            radiusKm={radiusKm}
            donors={filteredDonors}
          />
        </div>
      </div>

      {/* Donors Near You List */}
      <section className="mt-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Donors near you</h2>
            <p className="text-sm text-gray-500">
              Showing {filteredDonors.length} eligible donor(s) within{" "}
              {radiusKm} km
            </p>
          </div>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-600 font-medium">
              No donors found for {selectedGroup} within {radiusKm} km.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try increasing the search radius to 10 km or 25 km, or post an
              emergency request.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-red-600 font-extrabold text-lg flex items-center justify-center">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{donor.name}</h3>
                      <p className="text-xs text-gray-500">
                        {donor.distanceKm} km away
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Eligible
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Phone hidden until accepted
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/create-request?bloodGroup=${donor.bloodGroup}`)
                    }
                    className="bg-gray-900 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}