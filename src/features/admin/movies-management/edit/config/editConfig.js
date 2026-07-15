const RATE_CLASSES = [
  { max: 3, className: "bg-red-600 focus:ring-red-600" },
  { max: 5, className: "bg-orange-600 focus:ring-orange-600" },
  { max: 7, className: "bg-cyan-600 focus:ring-cyan-600" },
];

export const getRateClasses = (rate) => {
  return (
    RATE_CLASSES.find(({ max }) => rate < max)?.className ??
    "bg-green-600 focus:ring-green-600"
  );
};