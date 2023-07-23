// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
  isHost: boolean;
  setIsHost: (isHost: boolean) => void;
};

type UserContextProviderProps = {
    children: React.ReactNode;
  };

const UserContext = createContext<UserContextType>({
  isHost: false,
  setIsHost: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [isHost, setIsHost] = useState(false);

  return (
    <UserContext.Provider value={{ isHost, setIsHost }}>
      {children}
    </UserContext.Provider>
  );
};
