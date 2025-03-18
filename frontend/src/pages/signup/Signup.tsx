import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4500/auth/signup", { name, password });
      console.log("Usuario registrado:", res.data);
      navigate("/login"); // Redirige al login tras el registro
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper2">
        <h2 className="loginTitle">Sign up!</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="max-w-sm mx-auto loginForm" onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="formInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Repeat password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="formInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="submitButton text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            Register
          </button>
        </form>
        <p className="notRegister text-sm font-medium text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
