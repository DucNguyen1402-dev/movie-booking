// utils/authStorage.ts

const USER_KEY = "user";

export const getCurrentUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

