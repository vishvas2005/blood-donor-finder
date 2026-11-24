import { useState } from "react";
import {
  Activity,
  Users,
  CheckCircle2,
  Flag,
  Search,
  Ban,
  ShieldCheck,
  X,
} from "lucide-react";

const WEEKLY_STATS = [
  { day: "Mon", count: 8 },
  { day: "Tue", count: 12 },
  { day: "Wed", count: 9 },
  { day: "Thu", count: 18 },
  { day: "Fri", count: 14 },
  { day: "Sat", count: 11 },
  { day: "Sun", count: 6 },
];

const INITIAL_REPORTS = [
  {
    id: "rep1",
    target: "User #U-409",
    reason: "Spam request",
    reportedBy: "Donor A",
    type: "USER",
    status: "PENDING",
  },
  {
    id: "rep2",
    target: "Request #REQ-882",
    reason: "Fake hospital details",
    reportedBy: "Donor B",
    type: "REQUEST",
    status: "PENDING",
  },
  {
    id: "rep3",
    target: "City Care Hospital",
    reason: "Awaiting verification docs",
    reportedBy: "System",
    type: "HOSPITAL",
    status: "PENDING",
  },
];

const RECENT_REQUESTS = [
  {
    id: "REQ-101",
    bloodGroup: "O-",
    hospital: "City Care Hospital",
    units: 2,
    radius: "10 km",
    status: "PARTIALLY_FILLED",
  },
  {
    id: "REQ-102",
    bloodGroup: "B+",
    hospital: "Apollo Spectra",
    units: 1,
    radius: "5 km",
    status: "FULFILLED",
  },
  {
    id: "REQ-103",
    bloodGroup: "A+",
    hospital: "District General Hospital",
    units: 3,
    radius: "25 km",
    status: "EXPIRED",
  },
  {
    id: "REQ-104",
    bloodGroup: "O+",
    hospital: "Metro Heart Institute",
    units: 2,
    radius: "5 km",
    status: "MATCHING",
  },
];

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const handleReportAction = (id, actionLabel) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: actionLabel } : r))
    );
  };

  const filteredRequests = RECENT_REQUESTS.filter(
    (r) =>
      r.hospital.toLowerCase().includes(search.toLowerCase()) ||
      r.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  const maxCount = Math.max(...WEEKLY_STATS.map((d) => d.count));

  const statusBadge = (status) => {
    switch (status) {
      case "FULFILLED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PARTIALLY_FILLED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "MATCHING":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Top Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            BloodLink Admin
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Platform Overview
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search hospital, blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Open requests</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">14</p>
          <p className="text-xs text-gray-400 mt-1">Across 3 active radii</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Active donors</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">128</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            +12 this week
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Fulfilled this week</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">39</p>
          <p className="text-xs text-gray-400 mt-1">Avg match time: 11 min</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Pending reports</span>
            <Flag className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-3xl font-extrabold text-red-600 mt-2">
            {reports.filter((r) => r.status === "PENDING").length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Requires moderation</p>
        </div>
      </div>

      {/* Middle Section: Weekly Chart + Reports to Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Requests per day
            </h2>
            <p className="text-xs text-gray-500">
              Emergency broadcasts in the last 7 days
            </p>
          </div>

          <div className="grid grid-cols-7 gap-3 items-end h-44 pt-6">
            {WEEKLY_STATS.map((item) => {
              const heightPct = Math.round((item.count / maxCount) * 100);
              const isPeak = item.count === maxCount;
              return (
                <div
                  key={item.day}
                  className="flex flex-col items-center gap-2 h-full justify-end"
                >
                  <span className="text-[11px] font-bold text-gray-700">
                    {item.count}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      isPeak ? "bg-red-600" : "bg-red-100 hover:bg-red-200"
                    }`}
                  />
                  <span className="text-xs font-medium text-gray-500">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reports to Review */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Reports to review
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Flagged users, fake requests & hospital verifications
          </p>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="border border-gray-200 rounded-xl p-3.5 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {rep.target}{" "}
                    <span className="font-normal text-gray-500">
                      — {rep.reason}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reported by {rep.reportedBy}
                  </p>
                </div>

                {rep.status !== "PENDING" ? (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700">
                    {rep.status}
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {rep.type === "HOSPITAL" ? (
                      <button
                        type="button"
                        onClick={() => handleReportAction(rep.id, "Verified")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verify
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReportAction(rep.id, "Banned")}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        Ban
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleReportAction(rep.id, "Dismissed")}
                      className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Recent requests
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase">
              <th className="pb-3">Blood</th>
              <th className="pb-3">Hospital</th>
              <th className="pb-3">Units</th>
              <th className="pb-3">Radius</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/70">
                <td className="py-3.5">
                  <span className="font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg text-xs">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="py-3.5 font-medium text-gray-900">
                  {req.hospital}
                </td>
                <td className="py-3.5 text-gray-600">{req.units}</td>
                <td className="py-3.5 text-gray-600">{req.radius}</td>
                <td className="py-3.5">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusBadge(
                      req.status
                    )}`}
                  >
                    {req.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}