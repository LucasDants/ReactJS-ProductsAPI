import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
  email: string;
  id: string;
}

export interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUserState] = useState<User>({
    name: "",
    email: "",
    id: "",
  });

  async function setUser(user: User) {
    setUserState(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
