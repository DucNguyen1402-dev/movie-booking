import { LoadingProvider, ToastProvider } from "@shared/providers";

import { ModalProvider } from "@contexts/admin/modal";
import { UserProvider } from "@contexts/admin/user";

const AdminProviders = ({ children }) => {
  return (
    <UserProvider>
      <ToastProvider>
        <LoadingProvider>
          <ModalProvider>{children}</ModalProvider>
        </LoadingProvider>
      </ToastProvider>
    </UserProvider>
  );
};

export default AdminProviders;
