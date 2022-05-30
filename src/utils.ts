export const mapOrientationToDegrees: {
  [key: string]: { [key: string]: string };
} = {
  F: {
    "90deg": "90deg",
    "180deg": "180deg",
    "0deg": "0deg",
    "270deg": "270deg",
  },
  L: {
    "90deg": "0deg",
    "180deg": "90deg",
    "0deg": "270deg",
    "270deg": "180deg",
  },
  R: {
    "90deg": "180deg",
    "180deg": "270deg",
    "0deg": "90deg",
    "270deg": "0deg",
  },
};

export const mapCardinalToDegrees: { [key: string]: string } = {
  N: "90deg",
  E: "180deg",
  W: "0deg",
  S: "270deg",
};

export const mapActionToMovement = (
  index: number,
  Xaxis: number
): {
  [key: string]: number;
} => ({
  "0deg": index - 1,
  "90deg": index - Xaxis,
  "180deg": index + 1,
  "270deg": index + Xaxis,
});

export const findIndexFromCoordinates = (
  Xaxis: number,
  Yaxis: number,
  positions: [X: string, Y: string]
) => {
  const maxIndex = Xaxis * Yaxis - 1;
  const minusX = Xaxis - Number(positions[0]);
  const minusY = (Number(positions[1]) - 1) * Xaxis;

  return maxIndex - minusX - minusY;
};

export const findBoxCoordinatesFromIndex = (
  index: number,
  XAxis: number,
  YAxis: number
) => {
  // create ranges according to the axis
  let ranges = [];
  let count = XAxis * YAxis - 1;
  for (let i = 1; i <= YAxis; i++) {
    ranges.push([count - XAxis + 1, count, i]);
    count -= XAxis;
  }

  // if box index within range, get x and y coordinates
  const foundRange = ranges.find((r) => index >= r[0] && index <= r[1]);
  if (foundRange) {
    return [index - foundRange[0] + 1, foundRange[2]];
  }
  return "Coordinates unknown";
};

export const findByIndex = (payload: string, index: number) =>
  payload.split("\n")[index].split("");

export const findCoordinates = (payload: string, index: number) =>
  payload.split("\n")[index].split(" ")[0].split("");

export const findOrientation = (payload: string, index: number) =>
  payload.split("\n")[index].split(" ")[1];
