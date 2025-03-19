import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import "./userForm.css";

export default function UserForm() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        // Puedes manejar el caso donde el contexto es undefined
        return <div>No autorizado</div>;
      }
  const { user, token } = authContext; // Usamos el contexto para obtener el usuario y el token
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargamos los datos del usuario en el formulario al inicio
    if (user) {
      setUpdatedUser({
        name: user.name || "",
        email: user.email || "",
        description: user.description || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const { value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, image: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Hacemos la petición PUT para actualizar los datos del usuario
      const response = await axios.put(
        "https://keyla-backend.onrender.com/user/update", // Cambia esta URL por la de tu API
        updatedUser,
        {
          headers: {
            "x-auth-token": token, // Enviamos el token de autenticación
          },
        }
      );
      console.log("Usuario actualizado:", response.data);
      setLoading(false);
      alert("Usuario actualizado con éxito");
    } catch (err) {
      console.error("Error al actualizar el usuario", err);
      setError("Error al actualizar los datos.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="productContainer flex items-center justify-center min-h-screen p-6">
        <div className="productForm w-full max-w-3xl p-6 shadow-lg rounded-2xl">
          <h2 className="productFormTitle text-xl font-semibold text-gray-800 mb-4">
            Editar Usuario
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="userForm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {updatedUser.image ? (
                  <img
                    src={updatedUser.image}
                    alt="Usuario"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  "Imagen"
                )}
              </div>
              <input
                type="text"
                name="image"
                placeholder="URL de la imagen"
                value={updatedUser.image}
                onChange={handleImageChange}
                className="productoInput w-full border p-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={updatedUser.name}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                value={updatedUser.email}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={updatedUser.description}
                onChange={handleChange}
                className="col-span-2 border p-2 rounded productoInput"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Actualizar Usuario"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
