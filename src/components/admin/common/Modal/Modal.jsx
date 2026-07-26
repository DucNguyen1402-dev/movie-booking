const Modal = ({ children, className = "" }) => {
  return (
    <div
      className={`z-80 flex w-full flex-col gap-3 rounded-xl border border-slate-700/60 bg-slate-800 p-6 text-slate-100 shadow-2xl shadow-black/90 lg:w-90 ${className}`}
    >
      {children}
    </div>
  );
};

const Header = ({ title, subtitle }) => (
  <div>
    {title && <h2 className="text-xl font-semibold text-slate-50">{title}</h2>}
    {subtitle && <p className="mt-3 text-sm text-slate-200">{subtitle}</p>}
  </div>
);

const Body = ({ children, className = "" }) => (
  <div className={`my-2 text-sm text-slate-200 ${className}`}>{children}</div>
);

const Footer = ({ children, className = "" }) => (
  <div className={`mt-3 flex justify-end gap-3 ${className}`}>{children}</div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
