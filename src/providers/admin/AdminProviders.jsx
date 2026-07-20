import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/loading";
import { ModalProvider } from "@contexts/admin/modal";
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
