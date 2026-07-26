const SURFACE_CLASSES = {
  normal: "bg-slate-950/40",
  deepDark: "bg-slate-950/80",
};

const DEFAULT_SURFACE = "normal";

const Backdrop = ({ surface = DEFAULT_SURFACE, className = "" }) => {
  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-[2px] transition-opacity duration-200 ${
        SURFACE_CLASSES[surface] ?? SURFACE_CLASSES[DEFAULT_SURFACE]
      } ${className}`}
    />
  );
};

export default Backdrop;
