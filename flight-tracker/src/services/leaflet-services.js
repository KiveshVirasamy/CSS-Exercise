import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_LOCATION = [-35, 25];
const DEFAULT_ZOOM_LEVEL = 2;
const MAX_ZOOM_LEVEL = 19;

// Initialize the map
const map = L.map("map").setView(DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL);

// Define the plane icon
const planeIconHtml = `<img src="../../assets/img/airplane.png" alt="plane icon" width="50px" height="50px">`;
const planeIcon = L.divIcon({
  html: planeIconHtml,
  iconSize: [24, 24],
  className: "plane-icon",
});

// Add the tile layer and marker to the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: MAX_ZOOM_LEVEL,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
const marker = L.marker(DEFAULT_LOCATION, { icon: planeIcon }).addTo(map);

// Define functions to reset the map view and set the map and marker to a given location
export function resetMapLocationView() {
  map.flyTo(DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL);
}

export function setMapAndMarkerToCurrentFlightLocation(lat, lon, heading) {
  map.flyTo([lat, lon], 10);
  marker.setLatLng([lat, lon]);
  planeIcon.options.rotationAngle = heading - 90;
}
