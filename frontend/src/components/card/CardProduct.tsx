import { useState, useContext, useEffect } from "react";
import "./cardProduct.css";
import { IoIosStarOutline } from "react-icons/io";
import { BookMarked } from 'lucide-react';
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface CardProps {
  _id: string;
  image: string;
  name: string;
  price: string;
  brand: string;
  stock: string;
  description: string;
  userImage: string; // Nueva prop para la imagen del usuario
  className?: string;
}

const CardProduct = ( props : CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para marcar si es favorito
  const auth = useContext(AuthContext);
  const { addToCart } = useCart();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart({
      _id: props._id,
      name: props.name,
      price: parseFloat(props.price),
      brand: props.brand,
      stock: props.stock,
      imageUrl: props.image
    })
  }

  useEffect(() => {
    // Verifica si el producto está en los favoritos del usuario
    const checkIfFavorite = async () => {
      if (!auth?.token)  return;
       
      try {
        const response = await axios.get("https://keyla-backend.onrender.com/user/favourites", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        
        // Comprueba si el producto está en la lista de favoritos
        const isInFavorites = response.data.some((product: any) => product._id === props._id);
        setIsFavorite(isInFavorites);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
        /* alert("Debes iniciar sesión para agregar a favoritos"); */
      }
    };

    checkIfFavorite();
  }, [auth?.token, props._id]);


  // Función para manejar agregar o eliminar de favoritos
  const handleToggleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!auth?.token) {
      toast.info("Debes iniciar sesión para agregar productos a favoritos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    };

    try {
      // Si ya es favorito, eliminarlo, sino agregarlo
      if (isFavorite) {
        // Hacer una solicitud DELETE para eliminarlo de favoritos
        await axios.delete(
          "https://keyla-backend.onrender.com/user/remove-favourite",
          { data: { productId: props._id }, headers: { Authorization: `Bearer ${auth.token}` } }
        );
        setIsFavorite(false); // Actualizar el estado para reflejar que ya no es favorito
      } else {
        // Verificar si el producto ya está en favoritos antes de agregarlo
        await axios.post(
          "https://keyla-backend.onrender.com/user/add-favourite",
          { productId: props._id },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json", // Asegúrate de enviar el tipo de contenido adecuado
            },
          }
        );
        setIsFavorite(true); // Actualizar el estado para reflejar que es favorito
      }
    } catch (error: any) {
      console.error("Error al gestionar favoritos:", error);
      alert("Debes iniciar sesión para agregar o eliminar de favoritos");
      if (error.response) {
        console.error("Detalles del error:", error.response.data); // Imprime más detalles del error
        if (error.response.data.message === "El producto ya está en favoritos") {
          alert("Este producto ya está en tu lista de favoritos.");
        }
      }
    }
  };
  
  const imageUrl = props.image.replace(/\\/g, '/');

  return (
    <div
      className={`myCardContainer ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Lado frontal */}
      <div className="cardFront">
        <span className="starContainer" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <BookMarked className="starFavourite" />
          ) : (
            <BookMarked />
          )}
        </span>

        <div className="imagenContainer">
          <img src={`https://keyla-backend.onrender.com/${imageUrl}`}  alt={props.name} className="w-full h-auto" />
        </div>
        <div className="cardDataContainer text-center">
          <h5 className="text-lg font-bold homeCardTitle">{props.name}</h5>
          <p className="text-green-400 font-semibold cardPrice">${props.price}</p>

          <hr className="lineSeparator" />

          <div className="dataCard">
            <p className="textLila">{props.brand}</p>
            <p className="textYellow">Stock: {props.stock}</p>
          </div>

          <div className="contenedorBotones">
            <Link to="/PaymentForm">
              <button className="botonComprar">Comprar</button>
            </Link>
            <button className="botonAgregar" onClick={handleAddToCart}>Agregar</button>
          </div>
        </div>
      </div>

      {/* Lado trasero */}
      <div className="cardBack">
        <img src={props.userImage} alt="Usuario" className="userImage" />

        <h3 className="text-lg font-bold">Publicado por:</h3>
        <p className="text-gray-300 text-sm">GamerX123</p>

        <div className="statsContainer">
          <div className="statItem">
            <span className="statNumber">150+</span>
            <span className="statLabel">Ventas</span>
          </div>
          <div className="statItem">
            <span className="statNumber">4.8⭐</span>
            <span className="statLabel">Calificación</span>
          </div>
          <div className="statItem">
            <span className="statNumber">3.2K</span>
            <span className="statLabel">Visitas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
