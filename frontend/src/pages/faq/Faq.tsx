import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import './faq.css'

type AccordionItem = {
  question: string;
  answer: string;
};

const faqData: AccordionItem[] = [
  {
    question: "¿Qué tipos de productos puedo encontrar en el marketplace?",
    answer: "Ofrecemos una amplia variedad de productos gaming, incluyendo teclados mecánicos, mouses, monitores de alta tasa de refresco, placas de video, sillas gamer y más."
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: "Sí, todos los productos cuentan con garantía oficial del fabricante. La duración de la garantía varía según el producto y la marca."
  },
  {
    question: "¿Cómo puedo pagar mi compra?",
    answer: "Aceptamos múltiples métodos de pago, incluyendo tarjetas de crédito y débito, transferencias bancarias y plataformas digitales como PayPal y MercadoPago."
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí, realizamos envíos a todo el país con distintas opciones de entrega, incluyendo envíos express y retiros en puntos de distribución."
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer: "El tiempo de entrega depende de tu ubicación y el tipo de envío seleccionado. En general, los envíos estándar tardan entre 3 y 7 días hábiles."
  },
  {
    question: "¿Puedo realizar devoluciones si el producto no cumple mis expectativas?",
    answer: "Sí, aceptamos devoluciones dentro de los primeros 10 días hábiles luego de recibir el producto, siempre que esté en su empaque original y sin uso."
  },
  {
    question: "¿Los precios incluyen IVA?",
    answer: "Sí, todos los precios publicados en nuestro marketplace incluyen IVA."
  },
  {
    question: "¿Cómo puedo contactar con soporte si tengo un problema con mi compra?",
    answer: "Puedes comunicarte con nuestro equipo de soporte a través del chat en línea, correo electrónico o WhatsApp."
  },
  {
    question: "¿Cómo sé si un producto es compatible con mi PC?",
    answer: "En cada producto encontrarás detalles técnicos y requisitos de compatibilidad. Si tienes dudas, nuestro equipo de soporte puede asesorarte."
  },
  {
    question: "¿Ofrecen financiamiento o cuotas sin interés?",
    answer: "Sí, ofrecemos opciones de financiamiento en hasta 12 cuotas sin interés con tarjetas de crédito seleccionadas."
  },
  {
    question: "¿Venden productos reacondicionados?",
    answer: "Sí, en nuestra sección de productos reacondicionados encontrarás opciones con descuentos especiales y garantía."
  },
  {
    question: "¿Tienen tienda física?",
    answer: "No, operamos exclusivamente como marketplace online, pero ofrecemos puntos de retiro en algunas ciudades."
  },
  {
    question: "¿Qué hago si mi producto llega con defectos de fábrica?",
    answer: "Si tu producto llega con defectos de fábrica, contáctanos de inmediato para gestionar un reemplazo o reembolso."
  },
  {
    question: "¿Cómo puedo seguir el estado de mi pedido?",
    answer: "Te enviaremos un número de seguimiento una vez que tu pedido haya sido despachado para que puedas monitorear su estado en tiempo real."
  },
  {
    question: "¿Qué marcas de productos gaming venden?",
    answer: "Trabajamos con marcas reconocidas como Razer, Logitech, Corsair, ASUS, MSI, HyperX, entre otras."
  },
  {
    question: "¿Puedo vender mis productos en su marketplace?",
    answer: "Sí, si eres un vendedor interesado en ofrecer tus productos en nuestro marketplace, contáctanos para más información sobre cómo registrarte."
  },
  {
    question: "¿Cómo sé si una oferta o descuento es real?",
    answer: "Nos aseguramos de que todas las ofertas y descuentos sean legítimos, comparando precios anteriores y trabajando con proveedores de confianza."
  },
  {
    question: "¿Cómo protegen mis datos personales al realizar una compra?",
    answer: "Utilizamos encriptación SSL y pasarelas de pago seguras para garantizar la protección de tu información personal y financiera."
  },
  {
    question: "¿Tienen servicio técnico o soporte postventa?",
    answer: "Sí, ofrecemos soporte postventa para ayudarte con cualquier inconveniente relacionado con tu compra."
  },
  {
    question: "¿Cómo puedo recibir notificaciones sobre nuevas ofertas y productos?",
    answer: "Puedes suscribirte a nuestro newsletter o seguirnos en redes sociales para enterarte de las últimas novedades y promociones."
  }
];


const Accordion = () => {
  return (
    <>
    <Header />
    <div className="faqContainer">
    <h2 className="faqTitle">Frequently asked questions</h2>
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <AccordionItemComponent key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
      </div>
    <Footer />
      </>
  );
};

const AccordionItemComponent = ({ question, answer }: AccordionItem) => {
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, []);

  return (
    <div className="faqRow border-b">
      <button
        className="w-full text-left py-3 px-4 font-semibold text-gray-800 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="faqQuestion">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="faqArrow"
        >
          ▼
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4"
      >
        <p className="faqAnswer py-2">{answer}</p>
      </motion.div>
    </div>
  );
};

export default Accordion;
