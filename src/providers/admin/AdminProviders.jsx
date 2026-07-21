import { NotificationProvider } from "@contexts/admin/notification";
import { LoadingProvider } from "@contexts/admin/loading";
import { ModalProvider } from "@contexts/admin/modal";
import { UserProvider } from "@contexts/admin/user";

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
