import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './placanje.scss'

const Placanje = () =>{

    const stripe = useStripe();
    const elementi = useElements();

    const UpravljanjePlacanjem  = async (e) =>{
        e.preventDefault();

        if(!stripe || !elementi ){
            return;
        }

        


    }

    return(
        <div className="StripeElement">
        <form className="StripeForma">
        <h2>Placanje karticom:</h2>
            <CardElement  />
        </form>
        </div>
    )
}

export default Placanje;