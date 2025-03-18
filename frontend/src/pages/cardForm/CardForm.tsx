import React, { useEffect, useState } from "react";
import chip from "../../assets/chip-tarjeta.png";
import visa from '../../assets/logos/visa.png';
import mastercard from '../../assets/logos/mastercard.png'
import styles from "./cardForm.module.css"; // Cambio en la importación
//import "./cardForm.css"



import { Plus, Minus } from "lucide-react";

const CreditCardForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("#### #### #### ####");
  const [cardName, setCardName] = useState("Jhon Doe");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [ccv, setCcv] = useState("");
  const [logoSrc, setLogoSrc] = useState("");

  const [footerMargin, setFooterMargin] = useState('0px');

  useEffect(() => {
    setFooterMargin(isFormVisible ? '250px': '0px');
  }, [isFormVisible]);

  const toggleFlip = () => setIsFlipped(!isFlipped);
  const toggleForm = () => setIsFormVisible(!isFormVisible);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, ""); // Eliminar espacios y caracteres no numéricos
    value = value.replace(/(.{4})/g, "$1 ").trim(); // Formatear en grupos de 4
    setCardNumber(value || ""); // Dejar vacío si no hay números

    // Detectar Visa o MasterCard por el primer dígito
    if (value.startsWith("4")) {
      setLogoSrc(visa);
    } else if (value.startsWith("5")) {
      setLogoSrc(mastercard);
    } else {
      setLogoSrc("");
    }
  };

  const handleCardNameChange = (e:any) => {
    // Permitimos letras (a-z, A-Z) y espacios
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Elimina todo lo que no sea una letra o un espacio
  
    // Actualizamos el estado con el valor filtrado
    setCardName(value); // Si está vacío, se establece el valor por defecto
  }

  const currentYear = new Date().getFullYear();
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const years = Array.from({ length: 9 }, (_, i) => (currentYear + i).toString());

  return (
    <>
    
    <div className={styles.contenedorCardForm}>
    
    <div className={styles.tarjetaContainer}> 
      {/* Tarjeta */}
      <section
        className={`${styles.tarjeta} ${isFlipped ? styles.active : ""}`}
        onClick={toggleFlip}
      >

        {/* Delantera */}
        <div className={styles.delantera}>
          <div className={styles["logo-marca"]}>
            {logoSrc && <img src={logoSrc} alt="Logo" />}
          </div>
          <img src={chip} className={styles.chip} alt="Chip" />
          <div className={styles.datos}>
            <div className={styles.grupo}>
              <p className={styles.label} style={{ textAlign: 'start' }}>Número Tarjeta</p>
              <p className={styles.numero} style={{ textAlign: 'start' }}>{cardNumber}</p>
            </div>
            <div className={styles.flexbox}>
              <div className={`${styles.grupo} ${styles.nombreContainer}`}>
                <p className={styles.label}>Nombre Tarjeta</p>
                <p className={styles.nombre}>{cardName}</p>
              </div>
              <div className={styles.grupo}>
                <p className={styles.label}>Expiracion</p>
                <p className={styles.expiracion}>
                  <span className={styles.mes}>{expMonth}</span> /{" "}
                  <span className={styles.year}>{expYear}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Tarjeta trasera */}
      <div className={styles.trasera}>
        <div className={styles["barra-magnetica"]}></div>
        <div className={styles.datos2}>
          <div className={`${styles.grupo} ${styles.grupo1}`} id="firma">
            <p className={styles.label}>Firma</p>
            <div className={styles.firma}><p></p></div>
          </div>
          <div className={`${styles.grupo} ${styles.grupo2}`} id="ccv">
            <p className={styles.label}>CCV</p>
            <p className={`${styles.ccv} ${styles.cvv2}`}> {ccv} </p>
          </div>
        </div>
        <p className={styles.leyenda}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus exercitationem, voluptates illo.</p>
        <a href="#" className={styles["link-banco"]}>www.cryptoweb.com</a>
      </div>   
      </section>

      {/* Contenedor Boton Abrir Formulario */}
      <div className={styles["contenedor-btn"]}>
        <button
          className={`${styles["btn-abrir-formulario"]} ${isFormVisible ? styles.active : ""}`}
          onClick={toggleForm}
        > 
          {isFormVisible ? <Minus size={20} /> : <Plus size={20} />} 
        </button>
      </div>

    </div>

    {/* Formulario */}
<div className={styles.formContainer}>
    <form 
    id="formulario-tarjeta" 
    className={`${styles["formulario-tarjeta"]} ${isFormVisible ? styles.visible : ""}`}
    >
  <div className={styles.formWrapper}>
    <h2 className={styles.loginTitle}>Agregar Tarjeta</h2>
    
    <div className={styles.mb4}>
      <label htmlFor="cardNumber" className={styles.label}>
        Número de Tarjeta
      </label>
      <input
        type="text"
        id="cardNumber"
        className={styles.formInput}
        value={cardNumber}
        onChange={handleCardNumberChange}
        placeholder="#### #### #### ####"
        required
        />
    </div>

    <div className={styles.mb4}>
      <label htmlFor="cardName" className={styles.label}>
        Nombre en la Tarjeta
      </label>
      <input
        type="text"
        id="cardName"
        className={styles.formInput}
        value={cardName}
        onChange={handleCardNameChange}
        placeholder="Jhon Doe"
        required
        />
    </div>

    <div className={styles.flexContainer}>
      <div className={styles.mb4}>
        <label htmlFor="expMonth" className={styles.label}>
          Mes de Expiración
        </label>
        <select
          id="expMonth"
          className={styles.formInput}
          value={expMonth}
          onChange={(e) => setExpMonth(e.target.value)}
          required
          >
          <option value="">MM</option>
          {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
        </select>
      </div>

      <div className={styles.mb4}>
        <label htmlFor="expYear" className={styles.label}>
          Año de Expiración
        </label>
        <select
          id="expYear"
          className={styles.formInput}
          value={expYear}
          onChange={(e) => setExpYear(e.target.value)}
          required
          >
          <option value="">AAAA</option>
          {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
        </select>
      </div>

      <div className={styles.mb4}>
        <label htmlFor="ccv" className={styles.label}>
          CCV
        </label>
        <input
          type="text"
          id="ccv"
          className={styles.formInput}
          value={ccv}
          onChange={(e) => setCcv(e.target.value)}
          placeholder="123"
          maxLength={3}
          required
          />
      </div>
    </div>

    <button type="submit" className={styles.submitButton}>
      Guardar Tarjeta
    </button>
  </div>
</form>
    </div>
        
    </div>

    <div style={{
      transition: "margin-top 1.3s ease-in-out",
      marginTop: isFormVisible ? "100px" : "0px"
    }}>
      
    </div>
  </>
  );
};

export default CreditCardForm;
