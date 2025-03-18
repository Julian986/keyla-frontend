import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    brand: string;
    stock: string;
    imageUrl: string;
}

interface CartContextType {
   cartItems: CartItem[];
   addToCart: (item: CartItem) => void;
   removeFromCart: (item: string) => void;
   clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guarda el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Borrar el carrito al cerrar el navegador
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Marcar que el usuario está cerrando la pestaña/navegador
            sessionStorage.setItem('isClosing', 'true');
        };

        const handlePageShow = (event: PageTransitionEvent) => {
            // Si el usuario recarga la página, eliminar la marca de cierre
            if (sessionStorage.getItem('isClosing') === 'true') {
                sessionStorage.removeItem('isClosing');
            }
        };

        const handlePageHide = (event: PageTransitionEvent) => {
            // Si el usuario está cerrando la pestaña/navegador, borrar el carrito
            if (sessionStorage.getItem('isClosing') === 'true') {
                localStorage.removeItem('cart');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pageshow', handlePageShow);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside some CartProvider');
    }
    return context;
};