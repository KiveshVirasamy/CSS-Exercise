import * as LeafletServices from "./services/leaflet-services.js";
import * as Utils from "./utils/utilities.js";

export function addFlightInfoToContainer(flight) {
  const flightInfo = document.getElementById("flights-info");
  if (!flightInfo) return;

  const speed = Utils.convertMPSToKPH(flight[11] ?? 0.0);

  const flightHtml = `
    <div class="single-flight">
      <span>${flight[1] || "None"}</span>
      <span class="media full-screen">${speed}m/s</span>
      <span>${flight[9] ?? 0}m/s</span>
      <span class="media large-screen-size">${flight[7] ?? 0.0}m</span>
      <span> ${flight[10] ?? 0}</span>
      <button id="${flight[1]}" class="track-button">Where is it?</button>
    </div>`;

  flightInfo.insertAdjacentHTML("beforeend", flightHtml);
}

export function addEventListenerToFlightButtons(flights) {
  const viewButtons = document.querySelectorAll(".track-button");

  viewButtons.forEach((button) => {
    const relatedInfo = flights.find((flight) => flight[1] === button.id);
    button.addEventListener("click", () =>
      toggleFlightFocus(button, relatedInfo)
    );
  });
}

function toggleFlightFocus(button, fltInfo) {
  const mapElements = document.getElementById("map");

  if (button.innerText === "CLOSE") {
    mapElements.style.visibility = "hidden";
    button.innerText = "Where is it?";
    LeafletServices.resetMapLocationView();
  } else {
    mapElements.style.visibility = "visible";
    button.innerText = "close";
    LeafletServices.setMapAndMarkerToCurrentFlightLocation(
      fltInfo[6],
      fltInfo[5],
      fltInfo[10]
    );
  }

  showAndHideButtonsAfterClick(button.innerText);
}

function showAndHideButtonsAfterClick(innerText) {
  const buttons = document.querySelectorAll(".track-button");

  buttons.forEach((button) => {
    button.parentNode.classList.toggle(
      "hidden",
      button.innerText !== innerText
    );
  });
}
