const colors = [
  "FF0000",
  "FF9900",
  "FF0099",
  "FFFFFF",
  "0000FF",
  "00FFFF",
  "00FF00",
];

export const getNextColor = (currentColor?: string): string => {
  const index = colors.indexOf(currentColor);
  if (index === -1) {
    return colors[0];
  }

  return colors[(index + 1) % colors.length];
};
