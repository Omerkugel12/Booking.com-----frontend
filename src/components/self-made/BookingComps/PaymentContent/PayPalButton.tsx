interface PayPalButtonProps {
  totalAmount: string;
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
      className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
      onClick={handlePayment}
    >
      <img
        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
        alt="PayPal"
        className="w-6 h-6 mr-2"
      />
      Pay with PayPal
    </button>
  );
}

export default PayPalButton;
