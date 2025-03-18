import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => { 
    
    const auth = useContext(AuthContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Estado para manejar errores
    const [isLoading, setIsLoading] = useState(false);  // Estado para controlar el loading
    const navigate = useNavigate();  // Inicializa el hook navigate
    
    useEffect(() => {
        if(auth?.user) {
            navigate('/profile');
        }
    }, [auth?.user, navigate])
    
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if(auth) {
            console.log("Intentando iniciar sesión con:", name, password);
            setIsLoading(true);
            setError(""); // Limpiar errores previos
    
            try {
                const success = await auth.login(name, password); // Intentamos hacer login
                if (success) {
                    // Usamos un pequeño delay para asegurarnos de que el estado de auth.user se haya actualizado
                    setTimeout(() => {
                        navigate('/profile');
                    }, 100); 
                } else {
                    setError("Error de autenticación. Por favor, revisa tus credenciales.");
                }
            } catch (error) {
                console.error("Error al iniciar sesión", error);
                setError("Hubo un problema al iniciar sesión. Intenta nuevamente.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    

    return (
        <>
        <div className="formContainer"> 
            <div className="formWrapper">
                <h2 className='loginTitle'>Log in !</h2>
                <form className="max-w-sm mx-auto loginForm" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User
                    </label>
                    <input
                    type="text"
                    id="email"
                    className="formInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    autoComplete='username'
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
                    className="formInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                    required
                    />
                </div>
                <div className="flex items-start mb-4">
                    <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Remember me
                    </label>
                </div>
                <button
                    type="submit"
                    className="submitButton text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={isLoading}  // Deshabilitar el botón mientras se está procesando la solicitud
                >
                    {isLoading ? "Cargando..." : "Submit"}  {/* Muestra 'Cargando...' mientras se está procesando */}
                </button>
                <br />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  {/* Mostrar mensaje de error si existe */}
                <div className="notRegister text-sm font-medium text-gray-500 ">
                Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
            </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;
