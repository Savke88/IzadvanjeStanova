import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Placanje = ({ onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

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
      return false;
    }

    console.log(`PaymentMethod created with ID: ${paymentMethod.id}`)

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
      let paymentIntentData;
      if(paymentIntentResponse.ok){

       paymentIntentData = await paymentIntentResponse.json();
       console.log('PaymentIntet odgovor je dobijen', paymentIntentData)
      } else{
      console.error('Network response was not ok')
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
              name: 'Test'
            }
          }
        }
      );

      console.log('Placanje je primeljeno', paymentResult)
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        paymentSucceeded = true;
        return true;
      }
    } catch (error) {
      alert(error.message);
      
    }
    onSuccessfulPayment(paymentSucceeded)
    return paymentSucceeded;
  };

  return (
    <>
      <CardElement />
      <button onClick={handlePaymentSubmit}>Platite vašu objavu</button>
    </>
  );
};

export default Placanje;
