export function calculateTheHeadingDirection(deg) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];

  function calculateTheHeadingDirection(deg) {
    const index = Math.floor(deg / 22.5 + 0.5) % 16;
    return directions[index];
  }
}

export function convertMPSToKPH(metersPerSecond) {
  return Math.round(metersPerSecond * 3.6);
}
