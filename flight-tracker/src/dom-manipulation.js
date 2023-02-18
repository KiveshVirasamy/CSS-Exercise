import * as LeafletServices from "./services/leaflet-services.js";
import * as Utils from "./utils/utilities.js";

const flightInfo = document.getElementById("flights-info");
const viewButtons = document.querySelectorAll(".track-button");

viewButtons.forEach((button) => {
  const relatedFlight = flights.find((flight) => flight[1] === button.id);

  button.addEventListener("click", () => {
    toggleFlightFocus(button, relatedFlight);
    showAndHideButtonsAfterClick(button.innerText);
  });
});

function addFlightInfoToContainer(flight) {
  if (!flightInfo) return;

  const speed = Utils.convertMPSToKPH(flight[11] ?? 0.0);
  const altitude = flight[9] ?? 0;
  const visibility = window.innerWidth >= 1024 ? "visible" : "hidden";

  const flightHtml = `
    <div class="single-flight">
      <span>${flight[1] || "None"}</span>
      <span class="media full-screen">${speed}m/s</span>
      <span>${altitude}m/s</span>
      <span class="media large-screen-size">${flight[7] ?? 0.0}m</span>
      <button id="${flight[1]}" class="track-button">Where is it?</button>
    </div>`;

  flightInfo.insertAdjacentHTML("beforeend", flightHtml);
}

function toggleFlightFocus(button, flight) {
  const mapElements = document.getElementById("map");

  if (button.innerText === "CLOSE") {
    mapElements.style.visibility = "hidden";
    button.innerText = "Where is it?";
    LeafletServices.resetMapLocationView();
  } else {
    mapElements.style.visibility = "visible";
    button.innerText = "CLOSE";
    LeafletServices.setMapAndMarkerToCurrentFlightLocation(
      flight[6],
      flight[5],
      flight[10]
    );
  }
}

function showAndHideButtonsAfterClick(innerText) {
  viewButtons.forEach((button) => {
    button.parentNode.classList.toggle(
      "hidden",
      button.innerText !== innerText
    );
  });
}
