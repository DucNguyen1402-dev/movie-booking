import { CancelButton, ConfirmButton } from "@shared/ui";

const DEFAULT_TITLE = "Bạn có chắc muốn rời trang?";
const DEFAULT_SUBTITLE = "Những thay đổi chưa lưu sẽ bị mất.";

import { Modal } from "@shared/overlays/modal/components";

const UnsavedChangesModal = ({ onCancel, onConfirm, title, subtitle }) => {
  return (
    <Modal>
      <Modal.Header
        title={title ?? DEFAULT_TITLE}
        subtitle={subtitle ?? DEFAULT_SUBTITLE}
      />

      <Modal.Footer>
        <CancelButton onClick={onCancel} surface="dark">
          Hủy
        </CancelButton>

        <ConfirmButton type="unsavedChanges" onClick={onConfirm}>
          Xác nhận
        </ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UnsavedChangesModal;
