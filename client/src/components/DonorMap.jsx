import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

// Default Leaflet marker icon fix for Vite
const donorIcon = new L.DivIcon({
  className: "custom-donor-pin",
  html: `<div style="background:#dc2626;color:white;font-weight:700;font-size:11px;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🩸</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const centerIcon = new L.DivIcon({
  className: "custom-center-pin",
  html: `<div style="background:#111827;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(220,38,38,0.25);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function DonorMap({
  center = [26.2183, 78.1828], // [lat, lng]
  radiusKm = 5,
  donors = [],
}) {
  return (
    <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Search Radius Circle */}
        <Circle
          center={center}
          radius={radiusKm * 1000}
          pathOptions={{
            color: "#dc2626",
            fillColor: "#dc2626",
            fillOpacity: 0.08,
            weight: 1.5,
          }}
        />

        {/* User / Hospital Center Pin */}
        <Marker position={center} icon={centerIcon}>
          <Popup>Your Search Location</Popup>
        </Marker>

        {/* Nearby Donor Pins (MongoDB stores [lng, lat], Leaflet needs [lat, lng]) */}
        {donors.map((donor) => {
          const [lng, lat] = donor.location.coordinates;
          return (
            <Marker key={donor._id} position={[lat, lng]} icon={donorIcon}>
              <Popup>
                <div className="text-xs">
                  <p className="font-bold text-gray-900">{donor.name}</p>
                  <p className="text-red-600 font-semibold">
                    Blood Group: {donor.bloodGroup}
                  </p>
                  <p className="text-gray-500">{donor.distanceKm} km away</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}