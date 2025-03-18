import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from "./pages/home/Home";
import UserProfile from "./pages/user/UserProfile";
import Login from "./pages/login/Login";
import SignInForm from "./pages/signup/Signup";
import { Tables } from "./pages/tables/Tables";
import Accordion from "./pages/faq/Faq";
import ProductForm from "./pages/productForm/ProductForm";
import PaymentForm from "./pages/paymentForm/PaymentForm";
import CreditCardForm from "./pages/cardForm/CardForm";
import BackButton from "./components/BackButton";
import UserForm from "./pages/userForm/UserForm";
import WhatsAppButton from "./components/whatsApp/WhatsAppButton";
import ChatCohere from "./components/chatCohere/ChatCohere";
import ProdContainer from "./components/prodContainer/ProdContainer";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <SearchProvider> 
        <BrowserRouter>
        <BackButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignInForm />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/support" element={<Accordion />} />
            <Route path="/ProductForm" element={<ProductForm />} />
            <Route path="/PaymentForm" element={<PaymentForm />} />
            <Route path="/cardForm" element={<CreditCardForm />} />
            <Route path="/userForm" element={<UserForm />} />
          
          </Routes>
          
          <ChatCohere />
          <WhatsAppButton />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </SearchProvider>
    </>
  )
}

export default App;
