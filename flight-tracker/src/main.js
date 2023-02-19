import {
  addEventListenerToFlightButtons,
  addFlightInfoToContainer,
} from "./dom-manipulation.js";
import { getFlightInfo } from "./services/flights-services.js";

async function displayFlightInfo() {
  try {
    const response = await getFlightInfo();
    const flightData = await response.json();

    flightData.states.forEach((flight) => {
      addFlightInfoToContainer(flight);
    });
    addEventListenerToFlightButtons(flightData.states);
  } catch (error) {
    console.error(error);
  }
}

displayFlightInfo();
