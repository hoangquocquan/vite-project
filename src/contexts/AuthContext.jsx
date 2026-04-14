import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginAuth,
  logoutAuth,
  registerAuth,
} from "../utils/api";

const AuthContext = createContext(null);
const SESSION_KEY = "macropulse_session";

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const session = loadSession();

    if (!session?.token) {
      return;
    }

    setToken(session.token);
    getCurrentUser(session.token)
      .then((payload) => {
        setCurrentUser(payload.user);
      })
      .catch(() => {
        localStorage.removeItem(SESSION_KEY);
        setCurrentUser(null);
        setToken(null);
      });
  }, []);

  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user: currentUser }));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUser, token]);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      async register({ fullName, email, password }) {
        const payload = await registerAuth({ fullName, email, password });
        setToken(payload.token);
        setCurrentUser(payload.user);
      },
      async login({ email, password }) {
        const payload = await loginAuth({ email, password });
        setToken(payload.token);
        setCurrentUser(payload.user);
      },
      async logout() {
        if (token) {
          try {
            await logoutAuth(token);
          } catch {
            // Keep logout resilient if token expired or backend restarted.
          }
        }

        setToken(null);
        setCurrentUser(null);
      },
    }),
    [currentUser, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }

  return context;
}
