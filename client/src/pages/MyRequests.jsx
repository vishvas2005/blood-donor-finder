import { Link } from "react-router-dom";
import { Plus, Clock, ArrowRight } from "lucide-react";
import { mockRequests } from "../utils/mockData";

export default function MyRequests() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My requests</h1>
          <p className="text-sm text-gray-500">
            Track live donor responses and manage active blood requests
          </p>
        </div>

        <Link
          to="/create-request"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          New request
        </Link>
      </div>

      <div className="space-y-4">
        {mockRequests.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-red-600 font-extrabold text-lg flex items-center justify-center shrink-0">
                {req.bloodGroup}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-gray-900">{req.hospital}</h2>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {req.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                  <span>
                    {req.acceptedDonors.length} of {req.unitsNeeded} units found
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {req.radiusKm} km radius
                  </span>
                </p>
              </div>
            </div>

            <Link
              to={`/requests/${req._id}`}
              className="inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
            >
              Track live
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}