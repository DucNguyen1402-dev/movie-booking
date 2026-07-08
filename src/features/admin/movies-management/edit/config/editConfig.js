const RATE_CLASSES = [
  { max: 3, className: "bg-red-500 focus:ring-red-500" },
  { max: 5, className: "bg-orange-500 focus:ring-orange-500" },
  { max: 7, className: "bg-cyan-500 focus:ring-cyan-500" },
];

export const getRateClasses = (rate) => {
  return (
    RATE_CLASSES.find(({ max }) => rate < max)?.className ??
    "bg-green-500 focus:ring-green-500"
  );
};