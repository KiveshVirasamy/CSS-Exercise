const BASE_URL = "https://opensky-network.org/api/states/all";

export function getFlightInformation() {
    return fetch(`${BASE_URL}`);
}