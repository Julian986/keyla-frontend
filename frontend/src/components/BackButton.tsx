// components/BackButton.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // La lógica para no mostrar el botón en la página inicial
    if (location.pathname !== "/" && location.pathname !== "/Home") {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
  }, [location.pathname]);

  const handleBackClick = () => {
    navigate(-1); // Función para volver atrás
  };

  if (!showButton) return null; // No renderiza el botón si no debe mostrarse

  return (
    <button
      onClick={handleBackClick}
      style={{
        position: "absolute",
        top: "102px",
        left: "57px",
        fontSize: "42px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
    <TbSquareRoundedArrowLeftFilled
        style={{
            color: "white"
      }} />
    </button>
  );
};

export default BackButton;
