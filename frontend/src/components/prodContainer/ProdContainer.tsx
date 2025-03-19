import { Container, Row, Col } from 'react-bootstrap';
import './prodContainer.css';
import CardProduct from '../card/CardProduct';
import teclado from '../../../public/teclado3.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Importa useLocation

interface ProdContainerProps {
  searchTerm: string;
}

// Productos predeterminados
const defaultProducts = Array(12).fill(null).map((_, index) => ({
  _id: `default-${index}`,
  image: teclado,
  name: "Buzo X",
  price: "49.99",
  brand: "Samsung",
  stock: "14",
  description: "Este buzo es perfecto para los días fríos, con un diseño único y cómodo para usar todo el día.",
  userImage: "https://edx.atptour.com/-/media/alias/player-headshot/F324"
}));

const ProdContainer = ({ searchTerm }: ProdContainerProps) => {
  const [products, setProducts] = useState(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState(defaultProducts); // Estado para productos filtrados
  const auth = useContext(AuthContext);


  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("https://keyla-backend.onrender.com/products");
        console.log("Productos recibidos de la API:", response.data);

        const allProducts = [...defaultProducts, ...response.data];
        setProducts(allProducts);
        filterProducts(allProducts, searchTerm); // Filtra los productos al cargar
      } catch (error) {
        console.error("Error al obtener productos del usuario: ", error);
      }
    };

  
      fetchUserProducts();
    
  }, [auth?.token]);

  // Filtra los productos cuando cambia el término de búsqueda
  useEffect(() => {
    filterProducts(products, searchTerm);
  }, [searchTerm]);

  // Función para filtrar productos
  const filterProducts = (products:any, term:any) => {
    if (!term) {
      setFilteredProducts(products); // Si no hay término, muestra todos los productos
    } else {
      const filtered = products.filter((product:any) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className=''>
      <Row>
        {filteredProducts.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className=''>
            <CardProduct className='myCardProduct' {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProdContainer;