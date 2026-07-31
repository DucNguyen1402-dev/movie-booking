const ModalFooter = ({ children, className = "" }) => (
  <div className={`mt-3 flex justify-end gap-3 ${className}`}>{children}</div>
);

export default ModalFooter;
