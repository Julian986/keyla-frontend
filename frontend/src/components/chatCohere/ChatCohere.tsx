import React, { useEffect, useState } from "react";
import { sendMessageToCohere } from "@/services/cohereService";
import { FaRobot, FaTimes } from "react-icons/fa";
import { ArrowUpFromDot, MessageCircle } from "lucide-react";
import { CiChat1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import "./chatCohere.css"

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatCohere = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = await sendMessageToCohere(input);
    const botMessage: Message = { text: botResponse, sender: "bot" };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    
    // Resetear el input después de enviar el mensaje
    setInput("");
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          {/* <FaRobot size={30} /> */}
          {/* <CiChat1 size={30} /> */}
          <MessageCircle />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="chat-container">
          {/* Botón para cerrar el chat */}
          <button className="chat-close-button" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="chat-send-button">
            <ArrowUpFromDot />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatCohere;
