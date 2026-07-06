import{ createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showLoading = () => setIsVisible(true);
  const hideLoading = () => setIsVisible(false);

  return (
    <LoadingContext.Provider value={{ isVisible, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);