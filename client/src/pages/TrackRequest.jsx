import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, CheckCircle2, Radio, XCircle } from "lucide-react";
import { mockRequests } from "../utils/mockData";

const STEPS = ["OPEN", "MATCHING", "PARTIALLY_FILLED", "FULFILLED"];

export default function TrackRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialReq =
    mockRequests.find((r) => r._id === id) || mockRequests[0];

  const [status, setStatus] = useState(initialReq.status);
  const [confirmedIds, setConfirmedIds] = useState([]);

  const currentStepIndex = STEPS.indexOf(status);

  const handleConfirmDonation = (donorId) => {
    setConfirmedIds((prev) => [...prev, donorId]);
    setStatus("FULFILLED");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Your request
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {initialReq.bloodGroup} • {initialReq.unitsNeeded} units
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {initialReq.hospital}
            </p>
          </div>

          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
            {confirmedIds.length > 0
              ? `${initialReq.unitsNeeded} of ${initialReq.unitsNeeded} found`
              : `${initialReq.acceptedDonors.length} of ${initialReq.unitsNeeded} found`}
          </span>
        </div>

        {/* 4-Step State Machine Bar */}
        <div>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {STEPS.map((step, idx) => (
              <div
                key={step}
                className={`h-2 rounded-full transition ${
                  idx <= currentStepIndex ? "bg-red-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 text-[11px] font-semibold text-gray-500">
            <span>Open</span>
            <span className="text-center">Matching</span>
            <span className="text-center">Partial</span>
            <span className="text-right">Fulfilled</span>
          </div>
        </div>

        {/* Auto-Expansion Info Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-gray-600">
          <Radio className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
          <span>
            Searching within <strong>{initialReq.radiusKm} km</strong> of{" "}
            <strong>{initialReq.hospital}</strong>. Automatically expands to 25
            km if needed.
          </span>
        </div>

        {/* Accepted Donors List */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            Accepted donors
          </h2>

          <div className="space-y-3">
            {initialReq.acceptedDonors.map((donor) => {
              const isConfirmed = confirmedIds.includes(donor.donorId);
              return (
                <div
                  key={donor.donorId}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        {donor.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {donor.distanceKm} km • {donor.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${donor.phone}`}
                      className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>

                    {isConfirmed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConfirmDonation(donor.donorId)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition cursor-pointer"
                      >
                        Confirm received
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cancel Request */}
        <div className="pt-2 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/my-requests")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel request
          </button>
        </div>
      </div>
    </main>
  );
}