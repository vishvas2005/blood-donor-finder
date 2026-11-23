import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, AlertCircle, Plus, Minus, Send } from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const URGENCY_LEVELS = [
  { id: "NORMAL", label: "Normal", desc: "Within 24 hrs" },
  { id: "URGENT", label: "Urgent", desc: "Within 6 hrs" },
  { id: "CRITICAL", label: "Critical", desc: "Immediate" },
];

export default function CreateRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || "O-"
  );
  const [unitsNeeded, setUnitsNeeded] = useState(2);
  const [hospital, setHospital] = useState("");
  const [urgency, setUrgency] = useState("URGENT");
  const [coords, setCoords] = useState([78.1828, 26.2183]); // [lng, lat]
  const [gpsStatus, setGpsStatus] = useState("Use current hospital GPS");

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setGpsStatus("Fetching GPS...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.longitude, pos.coords.latitude]);
        setGpsStatus(
          `Pinned (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`
        );
      },
      () => {
        setGpsStatus("Permission denied — using default");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hospital.trim()) return alert("Please enter hospital name");

    // Backend connect hone par yahan POST /api/requests call hoga
    console.log("New Request Payload:", {
      bloodGroup,
      unitsNeeded,
      hospital,
      urgency,
      location: { type: "Point", coordinates: coords },
    });

    navigate("/requests/req101");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            Emergency Broadcast
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Post a blood request
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Eligible donors within 5 km will be alerted immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blood Group Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Required blood group
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  type="button"
                  key={bg}
                  onClick={() => setBloodGroup(bg)}
                  className={`py-2.5 rounded-xl font-bold text-sm border transition cursor-pointer ${
                    bloodGroup === bg
                      ? "bg-red-600 text-white border-red-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-300"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Units Needed Stepper */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Units needed
            </label>
            <div className="inline-flex items-center gap-4 border border-gray-200 rounded-xl p-1.5 bg-gray-50">
              <button
                type="button"
                onClick={() => setUnitsNeeded((u) => Math.max(1, u - 1))}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-gray-900 w-16 text-center">
                {unitsNeeded} {unitsNeeded === 1 ? "Unit" : "Units"}
              </span>
              <button
                type="button"
                onClick={() => setUnitsNeeded((u) => Math.min(6, u + 1))}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hospital Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Hospital name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. City Care Hospital"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Hospital location
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl flex items-center gap-2 transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span className="truncate">{gpsStatus}</span>
              </button>
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Urgency level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {URGENCY_LEVELS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setUrgency(item.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    urgency === item.id
                      ? "border-red-600 bg-red-50/70"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      urgency === item.id ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Broadcast Request
          </button>
        </form>
      </div>
    </main>
  );
}