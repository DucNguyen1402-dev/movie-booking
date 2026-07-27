import { CancelButton, ConfirmButton } from "@components/admin/ui/buttons";

import Modal from "./Modal";

const LeavePageModal = ({ onCancel, onConfirm }) => {
  return (
    <Modal>
      <Modal.Header
        title="Rời khỏi trang?"
        subtitle="Các thay đổi chưa được lưu sẽ bị mất."
      />

      <Modal.Footer>
        <CancelButton onClick={onCancel} surface="dark">
          Hủy
        </CancelButton>

        <ConfirmButton type="leavePage" onClick={onConfirm}>
          Xác nhận
        </ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default LeavePageModal;
