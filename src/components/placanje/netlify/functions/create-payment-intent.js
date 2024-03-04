require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);
        console.log(`Received amount for payment intent: ${amount}`);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        console.log(`PaymentIntent created with ID: ${paymentIntent.id}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
        };
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
