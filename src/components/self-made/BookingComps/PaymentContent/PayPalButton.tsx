interface PayPalButtonProps {
  totalAmount: number;
  currency: string;
  onPaymentSuccess: (data: any) => void;
  onPaymentError: (error: any) => void;
}

function PayPalButton({
  totalAmount,
  currency,
  onPaymentSuccess,
  onPaymentError,
}: PayPalButtonProps) {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/paypal/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalAmount, currency }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        onPaymentSuccess(data.orderID);
      }
      //redirect the user to the PayPal approval page
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("Approval URL not found");
      }
    } catch (error) {
      onPaymentError(error);
    }
  };

  return (
    <button
      className="flex items-center justify-center bg-yellow text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 overflow-hidden"
      onClick={handlePayment}
    >
      <img src="/src/images/PayPal-Logo.png" alt="PayPal" className="w-28" />
    </button>
  );
}

export default PayPalButton;
