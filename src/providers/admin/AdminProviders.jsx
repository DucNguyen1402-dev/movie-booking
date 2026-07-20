import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/LoadingSpinnerContext";
import { ModalProvider } from "@contexts/admin/ModalContext";

const AdminProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <LoadingProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </LoadingProvider>
    </NotificationProvider>
  );
};

export default AdminProviders;