import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cardsData } from "@/data/cards"; // Datos de usuarios
// import { productsData } from "@/data/products"; // Datos de productos
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { CardType } from "@/types/cardType";
import { FaShoppingCart, FaShoppingBag, FaCircle, FaUser, FaExchangeAlt, FaDollarSign } from "react-icons/fa"; 
//import { LampDemo } from "@/components/Lamp";
import './tables.css'

export function Tables() {
  const [active, setActive] = useState<CardType | null>(null);
  const [showUsers, setShowUsers] = useState(true); // Estado para alternar tablas
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, []);

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <Header />

      {/* <LampDemo /> */}
     {/*  <h2>Hola</h2> */}
      <div className="myLine absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"></div>
        <div className="myShadowLine absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-25 blur-3xl"></div>
      
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="modalCard fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md"
            >
              <button
                className="absolute top-4 right-4 bg-white text-black rounded-full p-1"
                onClick={() => setActive(null)}
              >
                ❌
              </button>
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-lg font-bold">{active.title}</h3>
              <p className="text-gray-400">{active.description}</p>
              <a
                href={active.ctaLink}
                target="_blank"
                className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
              >
                {active.ctaText}
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tabla dinámica (Usuarios o Productos) */}
      <div className="myTable p-4">
              {/* Botón para cambiar entre tablas */}
      <div className="tableButtonContainer flex justify-center my-2">
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="buttonTable bg-blue-500 text-white px-4 py-2 rounded shadow flex items-center"
        >
          <FaExchangeAlt className="mr-2" /> Cambiar a {showUsers ? "Productos" : "Usuarios"}
        </button>
      </div>
        <table className="w-full border-collapse text-white">
        <thead>
            <tr className="bg-gray-800 text-white headerRow">
              <th className="p-3 text-left">
                {showUsers ? <FaUser className="inline-block text-xl mr-2" /> : <FaShoppingBag className="inline-block text-xl mr-2" />}
                {showUsers ? "Usuario" : "Producto"}
              </th>
              <th className="p-3 text-center">
                <FaDollarSign className="inline-block text-xl text-yellow-400" /> Ventas
              </th>
              <th className="p-3 text-center">
                <FaShoppingCart className="inline-block text-xl text-green-400" /> {showUsers ? "Compras" : "Precio"}
              </th>
              <th className="p-3 text-center">
                <FaCircle className="inline-block text-xl text-blue-400" /> Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {(showUsers ? cardsData : cardsData).map((item:any) => (
              <motion.tr 
                key={item.title}
                className="myTableRow border-b border-gray-700 hover:bg-gray-700 transition"
                onClick={() => setActive(item)}
              >
                {/* Imagen y Nombre */}
                <td className="p-3 flex items-center">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-10 h-10 rounded-lg mr-3"
                  />
                  <span className="text-sm font-semibold">{item.title}</span>
                </td>

                {/* Compras / Precio */}
                <td className="p-3 text-center">
                  {showUsers ? "-" : `$${item.price}`}
                </td>
                
                {/* Compras / Precio */}
                <td className="p-3 text-center">
                  {showUsers ? "-" : `$${item.price}`}
                </td>

                {/* Estado */}
                <td className="p-3 text-center">
                  <FaCircle 
                    className={`text-xl ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}
