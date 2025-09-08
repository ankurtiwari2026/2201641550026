import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("shortly_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("shortly_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("shortly_user");
    }
  }, [user]);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("shortly_users") || "[]");
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) throw new Error("Invalid username or password");
    setUser({ username: found.username });
  };

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("shortly_users") || "[]");
    if (users.some(u => u.username === username)) {
      throw new Error("Username already exists");
    }
    users.push({ username, password });
    localStorage.setItem("shortly_users", JSON.stringify(users));
    setUser({ username });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
