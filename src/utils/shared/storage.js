const USER_KEY = "user";
const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

export const getCurrentUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};


export const clearAuth = () => {
  removeToken();
  removeCurrentUser();
};