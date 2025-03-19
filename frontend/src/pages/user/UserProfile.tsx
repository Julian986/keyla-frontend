import { FaCog, FaUserEdit } from "react-icons/fa";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./userProfile.css";
import teclado from '../../../public/teclado1-removebg-preview.png'
import CardProductProfile from "@/components/card/CardProductProfile";
import { IoMdAdd } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/productType";
import axios from "axios";
import { Link } from "react-router-dom";
import userImage from '../../../public/userProfile.png'

const ProfileComponent = () => {
  const [selectedTab, setSelectedTab] = useState("products_for_sale");
  const [products, setProducts] = useState<Product[]>([]);
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, []);
  
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("https://keyla-backend.onrender.com/user/products", {
          headers: { "x-auth-token": auth?.token }
        });
        console.log("Response.data: "+response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    const fetchFavouriteProducts = async () => {
      try {
        console.log("Token enviado en la petición:", auth?.token);
        const response = await axios.get<Product[]>("https://keyla-backend.onrender.com/user/favourites", {
          headers: { "x-auth-token": auth?.token }
        });
        console.log("Productos a la venta: "+response.data);
        setFavouriteProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos favoritos del usuario", error);
      }
    };

    
    if(auth?.token) {
      fetchProducts();
      fetchFavouriteProducts();
    }
    
  }, [auth?.token]);
  
  const handleRemoveFavourite = async (productId: string) => {
    if(!auth?.token) return;

    try {
      await axios.delete(
        'https://keyla-backend.onrender.com/user/remove-favourite',
        {
          data: { productId },
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setFavouriteProducts(prev => prev.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error al eliminar de favoritos", error);
      alert("Error al eliminar de favoritos");
    }
  };

  const handleRemoveProductsForSale = async (productId: string) => {
    if(!auth?.token) return;

    try {
      await axios.delete(
        'https://keyla-backend.onrender.com/user/remove-product-for-sale',
        {
          data: {productId},
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch(error) {
      console.error("Error al eliminar producto a la venta", error);
      alert("Error al eliminar producto a la venta");
    }
  }


  
  const handleLogout = () => {
    auth?.logout();  // ❌ Esto no hace nada porque falta invocar la función
    navigate("/");
  };

  const user = {
    products_for_sale: [
      { id: 1, name: "Producto 1", description: "Descripción del producto 1" },
      { id: 2, name: "Producto 2", description: "Descripción del producto 2" },
    ],
    purchased_products: [
      { id: 3, name: "Producto 3", description: "Descripción del producto 3" },
    ],
    favorite_products: [
      { id: 4, name: "Producto 4", description: "Descripción del producto 4" },
    ],
    transactions: ["Compra de Producto 1", "Venta de Producto 3"],
  };

/*   const products = Array(3).fill({
    image: teclado,
    title: "Buzo X",
    price: "$49.99",
    description: "Este buzo es perfecto para los días fríos, con un diseño único y cómodo para usar todo el día.",
    userImage: "https://edx.atptour.com/-/media/alias/player-headshot/F324"
  }); */

  const renderContent = () => {
    switch (selectedTab) {
      case "products_for_sale":
        if(products.length == 0) {
          return <h2>You don´t have any products for sale</h2>;
        } else {

          return products.map((product) => (
            <CardProductProfile 
              key={product._id} 
              className='myCardProduct' {...product}  
              onRemove={handleRemoveProductsForSale} />
            
          ));
        }

      case "purchased_products":
        return user.purchased_products.map((product) => (
          <div key={product.id} className="w-full h-40 bg-gray-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-gray-400">{product.description}</p>
          </div>
        ));

      case "favorite_products":
        if (favouriteProducts.length === 0) {
          return <h2>You don't have any favorite products</h2>;
        } else {
          return favouriteProducts.map((product) => (
            <CardProductProfile 
              key={product._id} 
              className="myCardProduct" 
              {...product} 
              onRemove={handleRemoveFavourite}
            />
          ));
        }

      case "transactions":
        return user.transactions.map((transaction, index) => (
          <div key={index} className="w-full h-40 bg-gray-800 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400">{transaction}</p>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <div className="profileContainer bg-black text-white min-h-screen flex flex-col items-center p-6">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <img src={auth?.user?.image?.length > 1 ? auth?.user?.image : userImage}  alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
               
                <h2 className="text-2xl font-bold">{auth?.user?.name || "Username"}</h2>
                <p className="text-gray-400">{auth?.user?.email || ""}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/userForm" className="addProduct">
              <button className="userBtn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <FaUserEdit /> Edit Profile
              </button>
              </Link>
              
              <Link to="/productForm" className="addProduct">
              <button className="userBtn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <IoMdAdd   /> Add product
              </button>
              </Link>

            <Link to="/userForm" className="addProduct">
              <button className="userBtn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <FaCog />
              </button>
            </Link>
            </div>
          </div>
          <p className="mt-4 text-gray-300">{auth?.user?.description || ""}</p>
      
        </div>
        <div className="w-full max-w-4xl mt-6">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Inventory</h3>
          <div className="flex space-x-4 mt-4">
            <button className={`px-4 py-2 ${selectedTab === "products_for_sale" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setSelectedTab("products_for_sale")}>Productos a la venta</button>
            <button className={`px-4 py-2 ${selectedTab === "purchased_products" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setSelectedTab("purchased_products")}>Productos comprados</button>
            <button className={`px-4 py-2 ${selectedTab === "favorite_products" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setSelectedTab("favorite_products")}>Productos favoritos</button>
            <button className={`px-4 py-2 ${selectedTab === "transactions" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setSelectedTab("transactions")}>Movimientos</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileComponent;