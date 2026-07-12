import { AddButton, CancelButton } from "@components/admin/buttons";

export default function FormActions({ onCancelClick, onAddClick }) {
  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      <CancelButton
        size="sm"
        surface="light"
        onClick={onCancelClick}
        type="button"
      >
        Hủy
      </CancelButton>
      <AddButton size="sm" surface="light" onClick={onAddClick} type="button">
        Thêm người dùng
      </AddButton>
    </div>
  );
}
