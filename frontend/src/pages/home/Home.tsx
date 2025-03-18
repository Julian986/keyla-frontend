import { useState, useEffect, useRef } from "react";
import Header from "@/components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterSidebar from "../../components/sidebar/FilterSidebar";
import "./Home.css";
import Main from "../../components/main/Main";
import ProdContainer from "../../components/prodContainer/ProdContainer";
import Intro from "../../components/intro/Intro";
import { BackgroundLines } from "../../components/background-lines";
import { InfiniteSlider } from "@/components/sliderInfinite/InfiniteImageSlider";
import teclado from "../../../public/teclado3.png";
import { ShoppingCart } from "lucide-react";
import KeylaShoppingCart from "@/components/shoppingCart/ShoppingCart";
import { useSearch } from "@/context/SearchContext";

//slider
import corsair from "../../../public/corsair2.png";
import razer from "../../../public/Razer-Emblem2.png";
import th from "../../../public/th.png";
import logitech from "../../../public/logitech2.png";
import hyper from "../../../public/Hyper.png";
import sony from "../../../public/sony2.png";
import aorus from "../../../public/aorus2.png";

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { searchTerm } = useSearch();

  const toggleCart = () => {
    setIsCartVisible((prev) => !prev);
  };

  // Desplaza la página hacia Main cuando searchTerm cambia
  useEffect(() => {
    if (searchTerm && mainRef.current) {
      const offset = 100; // Ajusta este valor para controlar cuánto baja la página
      const top = mainRef.current.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [searchTerm]);

  // Desplaza la página al inicio cuando se carga el componente
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <div className="introContainer">
          <BackgroundLines className="backgroundLines">
            <p>hola</p>
          </BackgroundLines>
          <Intro mainRef={mainRef} />
        </div>

        <Main ref={mainRef}>
          <FilterSidebar />
          <ProdContainer searchTerm={searchTerm} />
        </Main>
      </div>

      <div className="py-12">
        <InfiniteSlider
          items={[
            { imageUrl: logitech, altText: "Imagen 1" },
            { imageUrl: th, altText: "Imagen 2" },
            { imageUrl: razer, altText: "Imagen 3" },
            { imageUrl: corsair, altText: "Imagen 3" },
            { imageUrl: hyper, altText: "Imagen 3" },
            { imageUrl: sony, altText: "Imagen 3" },
            { imageUrl: aorus, altText: "Imagen 3" },
          ]}
          direction="left"
          speed="normal"
          pauseOnHover
          className="[--gap:1rem] imgSlider"
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;