const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    unitsNeeded: { type: Number, required: true, min: 1 },
    hospital: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    urgency: {
      type: String,
      enum: ["NORMAL", "URGENT", "CRITICAL"],
      default: "URGENT",
    },
    status: {
      type: String,
      enum: [
        "OPEN",
        "MATCHING",
        "PARTIALLY_FILLED",
        "FULFILLED",
        "EXPIRED",
        "CANCELLED",
        "FLAGGED",
      ],
      default: "OPEN",
    },
    acceptedDonors: [
      {
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        acceptedAt: { type: Date, default: Date.now },
      },
    ],
    radiusKm: { type: Number, default: 5 },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

requestSchema.index({ location: "2dsphere" });
requestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Request", requestSchema);