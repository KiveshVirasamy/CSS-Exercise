import {
  addEventListenerToFlightButtons,
  addFlightInfoToContainer,
} from "./dom-manipulation.js";
import { getFlightInfo } from "./services/flights-services.js";

async function displayFlightInfo() {
  try {
    const flightData = await getFlightInfo().then((response) =>
      response.json()
    );

    flightData.states.forEach(addFlightInfoToContainer);
    addEventListenerToFlightButtons(flightData.states);
  } catch (error) {
    console.error(error);
  }
}

displayFlightInfo();
