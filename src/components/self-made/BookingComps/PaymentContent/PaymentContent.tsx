import { useEffect } from "react";
import PayPalButton from "./PayPalButton";
import { useSearchParams } from "react-router-dom";

function PaymentContent() {
  const [searchParams] = useSearchParams();

  const handlePaymentSuccess = (data: any) => {
    console.log("Payment successful!", data);
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment failed!", error);
  };

  useEffect(() => {
    const orderId = searchParams.get("token");

    if (orderId) {
      // Capture the payment
      const capturePayment = async () => {
        try {
          const response = await fetch("/api/paypal/capture-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId }),
          });

          const data = await response.json();

          if (response.ok) {
            handlePaymentSuccess(data);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          handlePaymentError(error);
        }
      };

      capturePayment();
    }
  }, [searchParams]);

  return (
    <>
      <PayPalButton
        totalAmount="10.00"
        currency="USD"
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
      <main className="">
        <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
          <h2 className="font-bold text-xl">When do you want to pay?</h2>
        </div>
      </main>
    </>
  );
}

export default PaymentContent;
