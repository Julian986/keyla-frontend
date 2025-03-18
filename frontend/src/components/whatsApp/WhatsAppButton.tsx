import { FaWhatsapp } from "react-icons/fa";
import './whatsAppButton.css'

const WhatsAppButton = () => {
  const botUrl = "https://wa.me/2235983114?text=Hola,%20quiero%20hablar%20con%20el%20bot"; // Reemplaza con el link del bot

  return (
    <a
      href={botUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
