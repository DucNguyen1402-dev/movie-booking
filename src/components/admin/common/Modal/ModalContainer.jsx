import { MODAL_CONFIG } from "@config/admin";

import { useModalContext } from "@contexts/admin";

const ModalContainer = () => {
  const { modal, close, startLoading, isLoading } = useModalContext();

  if (!modal.type) return null;

  const { Component, loading } = MODAL_CONFIG[modal.type];

  const onConfirmClick = () => {
    if (!modal.onConfirm) return;

    if (loading) {
      startLoading();
    }

    modal.onConfirm();
  };

  return (
    <Component
      onCancel={modal.onCancel ?? close}
      onConfirm={onConfirmClick}
      title={modal.title}
      subtitle={modal.subtitle}
      loading={isLoading}
    />
  );
};

export default ModalContainer;
