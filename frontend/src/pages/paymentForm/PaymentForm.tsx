import { useState } from 'react';
import { Link } from 'react-router-dom';
import './payment.css';

const PaymentForm = () => { 
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
       // e.preventDefault();
        if(!selectedMethod) {
            setError("Please select a payment method");
            return;
        }
        
        setIsProcessing(true);
        setError("");
        
        // Simular procesamiento de pago
        setTimeout(() => {
            setIsProcessing(false);
            alert(`Payment processed with: ${selectedMethod}`);
        }, 2000);
    };

    const paymentMethods = [
        {
            id: 'credit-card',
            title: 'Credit Card',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <path d="M1 10h22"/>
                </svg>
            )
        },
        {
            id: 'paypal',
            title: 'PayPal',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.365 19.833l1.93-3.89a4.5 4.5 0 00-4.183-2.51V4.5h-6a1 1 0 00-1 1V18a1 1 0 001 1h2.758a2 2 0 011.715-.971l2.71.275zM15 4.5h6a1 1 0 011 1V18a1 1 0 01-1 1h-6V4.5zm6 2h-6"/>
                </svg>
            )
        },
        {
            id: 'crypto',
            title: 'Crypto',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
                </svg>
            )
        }
    ];

    return (
        <>
        {/* <Header /> */}
        <div className="formContainerPayment"> 
            <div className="formWrapperPayment">
                <h2 className="paymentTitle">Select Payment Method</h2>
                <form className="paymentForm" onSubmit={handleSubmit}>
                    <div className="paymentMethods">
                        {paymentMethods.map(method => (
                            <div 
                                key={method.id}
                                className={`methodCard ${selectedMethod === method.id ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod(method.id)}
                            >
                                <div className="methodIcon">{method.icon}</div>
                                <h3 className="methodTitle">{method.title}</h3>
                            </div>
                        ))}
                    </div>
                    
                    <div className="securityNote">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                            <path d="M12 12h.01"/>
                        </svg>
                        <span>All transactions are securely encrypted</span>
                    </div>

                    <Link to="/cardForm">
                    <button
                        type="button"
                        className="submitButtonPayment"
                        disabled={isProcessing || !selectedMethod}
                        >
                        {isProcessing ? "Processing..." : "Confirm Payment"}
                    </button>
                    </Link>
                    
                    {error && <p className="errorMessage">{error}</p>}
                </form>
            </div>
        </div>
        {/* <Footer /> */}
    </>
    );
};

export default PaymentForm;