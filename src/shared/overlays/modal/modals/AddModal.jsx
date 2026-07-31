import { Modal } from "@shared/overlays/modal/components";
import { CancelButton, ConfirmButton } from "@shared/ui";

const AddModal = ({ onCancel, onConfirm, title, subtitle }) => {
  return (
    <Modal>
      <Modal.Header title={title} subtitle={subtitle} />

      <Modal.Footer>
        <CancelButton onClick={onCancel} surface="dark">
          Hủy
        </CancelButton>

        <ConfirmButton type="add" onClick={onConfirm}>
          Xác nhận
        </ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
