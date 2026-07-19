export function getColorPairForClientId(clientId) {
  const hue = (clientId * 137.508) % 360;
  return {
    color: `hsl(${hue}, 70%, 55%)`,
    colorLight: `hsla(${hue}, 70%, 55%, 0.25)`,
  };
}