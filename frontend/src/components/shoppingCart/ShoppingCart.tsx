import { Trash, X } from 'lucide-react';
import { useState } from 'react';
import './shopping.css'
import teclado from "../../../public/teclado3.png"
import { useCart } from '@/context/CartContext';

interface ShoppingProps {
  onClose: () => void;
}

const KeylaShoppingCart = ({ onClose }: ShoppingProps) => {
  const [items, setItems] = useState([
    { name: 'Zapatillas Nike', size: '42', price: 25000, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Remera Adidas', size: 'M', price: 12000, imageUrl: 'https://via.placeholder.com/150' },
  ]);

  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const missingAmount = Math.max(0, 92000 - total);

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  return (
    <div className="shoppingContainer fixed z-[12000] right-0 top-0 w-96 h-full p-6 transform transition-transform duration-300 ease-in-out">
      {/* Encabezado del carrito */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-200">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Lista de items */}
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Tu carrito está vacío</p>
        </div>
      ) : (
        <div className="overflow-y-auto h-[calc(100vh-300px)]">
          {cartItems.map((item, index) => (
            <div key={index} className="item mb-4 p-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover mr-4" />
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.brand}</p>
                    <p className="text-sm text-gray-400">Stock: {item.stock}</p>
                    <p className="text-sm font-bold">${item.price.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="deleteButton p-2 hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resumen y acciones */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className='subTotal'>Subtotal</span>
          <span className='subTotal'>${total.toLocaleString()}</span>
        </div>
        <div className="text-sm text-gray-400 mb-4">
          {missingAmount > 0 ? (
            <span>Te faltan ${missingAmount.toLocaleString()} para envío gratis.</span>
          ) : (
            <span className="text-green-400">¡Envío gratis!</span>
          )}
        </div>

        <button
          onClick={clearCart}
          className="actionButton"
          disabled={items.length === 0}
        >
          Vaciar Carrito
        </button>
        <button
          className="actionButton"
          disabled={items.length === 0}
        >
          Iniciar Pago
        </button>
    {/*     <button className="continueButton">
          Seguir Comprando
        </button> */}
      </div>
    </div>
  );
};

export default KeylaShoppingCart;