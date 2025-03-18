import { useContext, useEffect, useState } from "react";
import { Search, Bell, User } from "lucide-react";
import {User2Icon} from "lucide-react"
import { FaBoxOpen, FaRegUser } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./header.css";

import { ShoppingCart } from "lucide-react";
import KeylaShoppingCart from "../shoppingCart/ShoppingCart";
import { useCart } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";
import {jwtDecode} from "jwt-decode"; 


const Header = () => {
  const menuItems = ["Home", "Forum", "Tables", "Support"];
  const [active, setActive] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const { clearCart } = useCart();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const isTokenExpired = (token: string):boolean => {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const toggleCart = () => {
    setIsCartVisible((prev) => !prev);
    setShowMenu(false);
  };

  const toggleUserMenu = () => {
    setShowMenu((prev) => !prev);
    setIsCartVisible(false);
  }

  const handleSearchChange = (e:any) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
    setActive(path || "Home");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if(token){
      if(isTokenExpired(token)) {
        auth?.logout();
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  const handleLogout = (e:any) => {
    e.preventDefault();
    auth?.logout();
    clearCart();
    navigate("/");

  };

  return (
    <header className="header py-3 miHeader">
      <nav className="w-full bg-gray-900 p-4 flex justify-between items-center border-b border-white-700 myNav">
        <div className="flex items-center gap-4">
          <span className="text-indigo-400 text-2xl font-bold">
            <img
              className="logoImg"
              src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
              alt="logo"
            />
          </span>
          <ul className="flex gap-6 ulNav">
            {menuItems.map((item) => (
              <Link to={`/${item}`} key={item}>
                <li
                  className={`cursor-pointer text-gray-400 hover:text-white px-3 py-1 rounded-md transition-all ${
                    active.toLowerCase() === item.toLowerCase()
                      ? "bg-gray-700 text-white"
                      : ""
                  }`}
                >
                  {item}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-md">
            <Search className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none px-2 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          
          <div className="relative user-menu">
            
              <span className="flex items-center gap-2">
                <FaRegUser
                  size={25} 
                  className="text-gray-400 cursor-pointer" 
                  onClick={toggleUserMenu}
                  />
              </span>

         {/*    <FaRegUser size={30}
              className="text-gray-400 cursor-pointer rounded-full border p-1"
              onClick={toggleUserMenu}
            /> */}

            {showMenu && (
              <div className="userBox absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg overflow-hidden z-10">
                <Link to="/profile" className="userLink block px-4 py-2 text-sm hover:bg-gray-700">
                  <span className="flex items-center gap-2">
                    <FaBoxOpen /> Inventory
                  </span>
                </Link>
                {isAuthenticated ? (
                  <a
                    onClick={handleLogout}
                    className="userLink block px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <BsDoorOpenFill /> Log out
                    </span>
                  </a>
                ) : (
                  <Link to="/login" className="userLink block px-4 py-2 text-sm hover:bg-gray-700">
                    <span className="flex items-center gap-2">
                      <BsDoorOpenFill /> Log in
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

            <div className="bellContainer">
              <Bell className="text-gray-400 cursor-pointer" />
            </div>

        <span onClick={toggleCart}>
          <ShoppingCart className="text-gray-400 cursor-pointer" />
        </span>

        {isCartVisible && <KeylaShoppingCart onClose={toggleCart} />}

        </div>
      </nav>
    </header>
  );
};

export default Header;
