export const mockDonors = [
    {
      _id: "d1",
      name: "Donor A",
      bloodGroup: "O-",
      distanceKm: 1.8,
      isAvailable: true,
      lastDonationDate: null,
      location: { coordinates: [78.1828, 26.2183] }, // [lng, lat]
    },
    {
      _id: "d2",
      name: "Donor B",
      bloodGroup: "O-",
      distanceKm: 3.4,
      isAvailable: true,
      lastDonationDate: "2026-06-10",
      location: { coordinates: [78.1912, 26.2231] },
    },
    {
      _id: "d3",
      name: "Donor C",
      bloodGroup: "O+",
      distanceKm: 4.9,
      isAvailable: true,
      lastDonationDate: null,
      location: { coordinates: [78.1755, 26.2110] },
    },
  ];
  
  export const mockRequests = [
    {
      _id: "req101",
      bloodGroup: "O-",
      unitsNeeded: 2,
      hospital: "City Care Hospital",
      urgency: "CRITICAL",
      status: "PARTIALLY_FILLED",
      radiusKm: 10,
      acceptedDonors: [
        {
          donorId: "d1",
          name: "Donor A",
          bloodGroup: "O-",
          distanceKm: 1.8,
          phone: "+91 98765 43210",
          status: "On the way",
        },
      ],
    },
  ];