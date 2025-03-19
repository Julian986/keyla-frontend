import { useState } from "react";
import { Product } from "@/types/productType";
import { FaTrash } from "react-icons/fa";
import "./cardProduct.css";

interface CardProps extends Product {
  className?: string;
  onRemove: (productId: string) => void; // Cambia el nombre de la prop a algo más genérico
}

const CardProductProfile = (props: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onRemove(props._id); // Usa la prop genérica
  };

  const imageUrl = props.image.replace(/\\/g, '/');

  return (
    <div
      className={`myCardContainer ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Lado frontal */}
      <div className="cardFront">
        <span className="starContainer" onClick={handleRemove}>
          <FaTrash className="deleteIcon" />
        </span>
        <div className="imagenContainer">
          <img src={`https://keyla-backend.onrender.com/${imageUrl}`} alt={props.name} className="w-full h-auto" />
        </div>
        <div className="cardDataContainer text-center">
          <h5 className="text-lg font-bold homeCardTitle">{props.name}</h5>
          <p className="text-green-400 font-semibold cardPrice"> ${props.price}</p>
          <hr className="lineSeparator" />
          <div className="dataCard">
            <p className="textLila">{props.category}</p>
            <p className="textYellow">Stock: {props.stock}</p>
          </div>

          <div className="contenedorBotones">
            <button className="botonAgregar">Edit</button>
          </div>
        </div>
      </div>

      {/* Lado trasero */}
      <div className="cardBack">
        {/* Foto del vendedor */}
        <img src={""} alt="Usuario" className="userImage" />

        {/* Información del vendedor */}
        <h3 className="text-lg font-bold">Publicado por:</h3>
        <p className="text-gray-300 text-sm">{props.seller?.name || "Desconocido"}</p>

        {/* Estadísticas */}
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

export default CardProductProfile;