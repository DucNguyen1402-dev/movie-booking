import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/customer/authApi";

const USER_STORAGE_KEY = "user";
const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const AUTH_CHANGED_EVENT = "customer-auth-changed";

const notifyAuthChanged = () => {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const getStoredUser = () => {
  const userLocal = localStorage.getItem(USER_STORAGE_KEY);

  if (!userLocal) return null;

  try {
    return JSON.parse(userLocal);
  } catch {
    return null;
  }
};

export const getStoredAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const user = getStoredUser();

  return accessToken || user?.accessToken || null;
};

export const saveUserToStorage = (user) => {
  if (!user) return;

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  if (user.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, user.accessToken);
  }

  notifyAuthChanged();
};

export const clearUserStorage = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

  notifyAuthChanged();
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  useEffect(() => {
    const syncCurrentUser = () => {
      setCurrentUser(getStoredUser());
    };

    window.addEventListener(AUTH_CHANGED_EVENT, syncCurrentUser);
    window.addEventListener("storage", syncCurrentUser);

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, syncCurrentUser);
      window.removeEventListener("storage", syncCurrentUser);
    };
  }, []);

  return currentUser;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.login(data);
      return response.data.content;
    },

    onSuccess: (user) => {
      saveUserToStorage(user);

      queryClient.invalidateQueries({
        queryKey: ["customer", "accountInfo"],
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.register(data);
      return response.data.content;
    },
  });
};

export const useAccountInfo = () => {
  return useQuery({
    queryKey: ["customer", "accountInfo"],

    queryFn: async () => {
      const response = await authApi.getAccountInfo();
      return response.data.content;
    },

    enabled: Boolean(getStoredAccessToken()),
    retry: false,
  });
};

export const useUpdateAccountInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.updateAccountInfo(data);
      return response.data.content;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "accountInfo"],
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    clearUserStorage();

    queryClient.removeQueries({
      queryKey: ["customer", "accountInfo"],
    });
  };

  return { logout };
};