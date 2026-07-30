import {
  LoadingProvider,
  ModalProvider,
  ToastProvider,
} from "@shared/providers";

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
