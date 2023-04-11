export const stripNumber = (numberToStrip: number): number => {
  return parseFloat(parseFloat(String(numberToStrip)).toFixed(2));
};
