import { Modal } from "@shared/overlays/modal/components";
import { CancelButton, ConfirmButton } from "@shared/ui";

const DeleteModal = ({ onCancel, onConfirm, title, subtitle, loading }) => {
  return (
    <Modal>
      <Modal.Header title={title} subtitle={subtitle} titleSize="sm" />

      <Modal.Footer>
        <CancelButton onClick={onCancel} surface="dark">
          Hủy
        </CancelButton>

        <ConfirmButton type="delete" onClick={onConfirm} loading={loading}>
          Xác nhận
        </ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
