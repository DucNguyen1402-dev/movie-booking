import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const Modal = ({ children, className = "" }) => {
  return (
    <div
      className={`z-80 flex w-full flex-col gap-3 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800 p-6 text-slate-100 shadow-2xl shadow-black/90 lg:w-90 ${className}`}
    >
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
