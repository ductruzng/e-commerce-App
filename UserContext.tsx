import { createContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface IUserContext {
  userId: string;
  setUserId: (userId: string) => void;
}

// Create the context with a default value
const UserType = createContext<IUserContext>({
  userId: '',
  setUserId: () => {}, // Empty function as placeholder
});

// Type the props for UserContext component
interface UserContextProps {
  children: ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
  const [userId, setUserId] = useState<string>('');

  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
