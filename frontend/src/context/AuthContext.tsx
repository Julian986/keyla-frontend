import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

interface AuthContextType {
  user: any;
  token: string | null;
  login: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Interceptor de Axios para verificar el token antes de cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Uso correcto de jwt_decode
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token expirado, elimina el token y redirige al login
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common["x-auth-token"];
        window.location.href = "/login";
        return Promise.reject(new Error("Token expirado"));
      }
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const isTokenExpired = (token: string): boolean => {
    const decodedToken: any = jwtDecode(token); // Uso correcto de jwt_decode
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        logout();
        return;
      }

      axios.defaults.headers.common["x-auth-token"] = token;
      axios.get("https://keyla-backend.onrender.com/user/me")
        .then((res) => {
          setUser(res.data);
          console.log("Datos de usuario obtenidos:", res.data);
        })
        .catch((err) => {
          console.error("Error al obtener usuario:", err);
          logout();
        });
    }
  }, [token]);

  const login = async (name: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("https://keyla-backend.onrender.com/auth/login", { name, password });
      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["x-auth-token"] = newToken;
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};