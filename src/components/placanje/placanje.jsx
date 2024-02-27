import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Placanje = ({ onSuccessfulPayment, onPaymentSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

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
      return false;
    }

    try {
      const paymentIntentResponse = await fetch(
        "../../../netlify/functions/createPaymentIntent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 500 }),
        }
      );

      const paymentIntentData = await paymentIntentResponse.json();

      if (!paymentIntentData.clientSecret) {
        throw new Error("Plaćanje nije moguće procesuirati.");
      }

      const paymentResult = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        onSuccessfulPayment();
        return true;
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  return (
    <>
      <CardElement />
      <button onClick={() => onPaymentSubmit(handlePaymentSubmit)}>Platite vašu objavu</button>
    </>
  );
};

export default Placanje;
