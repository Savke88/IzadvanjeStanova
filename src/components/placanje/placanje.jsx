import { React, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './placanje.scss'
const Placanje = ({ onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let paymentSucceeded = false;
    if (!stripe || !elements) {
      alert("Stripe nije inicijalizovan.");
      return false;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[createPaymentMethod error]", error);
      setIsSubmitting(false);
      return false;
    }

    console.log(`PaymentMethod created with ID: ${paymentMethod.id}`);

    try {
      const paymentIntentResponse = await fetch(
        "http://localhost:8888/.netlify/functions/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 500 }),
        }
      );
      const paymentIntentData = await paymentIntentResponse.json();
      if (!paymentIntentResponse.ok) {
        console.error("Network response was not ok");
      }
      if (!paymentIntentData.clientSecret) {
        throw new Error("Plaćanje nije moguće procesuirati.");
      }

      const paymentResult = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Test",
            },
          },
        }
      );

      console.log("Placanje je primeljeno", paymentResult);
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        paymentSucceeded = true;
        return true;
      }
    } catch (error) {
      console.log(error.message);
    }
    onSuccessfulPayment(paymentSucceeded);
    setIsSubmitting(false);
    return paymentSucceeded;
  };

  return (
    <>
      <CardElement />
      <button
        className={`payment-button ${isSubmitting ? "submitting" : ""}`}
        disabled={isSubmitting}
        onClick={handlePaymentSubmit}
      >
        Platite vašu objavu
      </button>
      <small className="uslovi-placanja">Klikom na dugme "Platite vašu objavu" prihvatate da vam bude naplaćeno 5€ sa vašeg računa preko kartice koju ste uneli</small>
    </>
  );
};

export default Placanje;
