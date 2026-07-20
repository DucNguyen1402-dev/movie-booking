import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/LoadingSpinnerContext";
import { ModalProvider } from "@contexts/admin/ModalContext";
import { UserProvider } from "@contexts/admin";

const AdminProviders = ({ children }) => {
  return (
    <UserProvider>
      <NotificationProvider>
        <LoadingProvider>
          <ModalProvider>{children}</ModalProvider>
        </LoadingProvider>
      </NotificationProvider>
    </UserProvider>
  );
};

export default AdminProviders;
