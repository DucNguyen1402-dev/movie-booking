import {
  LoadingProvider,
  ModalProvider,
  ToastProvider,
} from "@shared/providers";

import { AuthProvider } from "@features/admin";

const AdminProviders = ({ children }) => {
  return (
    <ToastProvider>
      <LoadingProvider>
        <ModalProvider>
          <AuthProvider>{children}</AuthProvider>
        </ModalProvider>
      </LoadingProvider>
    </ToastProvider>
  );
};

export default AdminProviders;
