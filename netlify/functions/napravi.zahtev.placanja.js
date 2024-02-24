require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) =>{


    try{
        const{kolicina}= JSON.parse(event.body);

        const nameraPlacanja = await stripe.nameraPlacanja.create({
            kolicina,
            valuta: "rsd",
            nacin_placanja: ["card"]
        })
        return{
            statusCode: 200,
            body: JSON.stringify({nameraPlacanja})
        }
    } catch(error) {

        console.log({error})

        return {
            status: 400,
            body: JSON.stringify({error}),
        }
    }
}
