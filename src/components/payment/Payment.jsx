import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

import "./Payment.css";
import Checkoutproducts from "../../pages/chekout/Checkoutproduct";
import { useStateValue } from "../StateProvider/StateProvider";
import axios from "../../axios";
import { db } from "../../util/Firebaseconfig";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const element = useElements();
  const getbaskettotal = (basket) =>
    basket?.reduce((amount, items) => amount + items.price, 0);

  const [error, seterror] = useState(null);
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setclientSecret] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getClientside = async () => {
      const response = await axios({
        method: "Post",
        url: `/payments/create?total=${getbaskettotal(basket) * 100}`,
      });
      setclientSecret(response.data.clientSecret);
    };
    getClientside();
  }, [basket]);

  console.log(" client sectrer", clientSecret);

  // this submit place
  const handlesubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: element.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSuccess(true);
        setProcessing(false);
        seterror(null);

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };
  // this handle change place
  const handlechange = (e) => {
    setDisable(e.empty);
    seterror(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      hh
      <div className="container_payment">
        <h1 className="chekout_paymnet">
          Chekout(<Link to="/checkouts">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_titel">
            <h3>Deliver Address</h3>
          </div>
          <div className="payment_adress">
            <p>{user?.email}</p>
            <p>123 line adress</p>
            <p>Adis Ababa</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_titel">
            <h3>Reveiw item and Delivery</h3>
          </div>
          <div className="paymnet_items">
            {basket.map((items) => (
              <Checkoutproducts
                id={items.id}
                title={items.title}
                image={items.img}
                price={items.price}
                rating={items.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_titel">
            <h3>Payment Methode</h3>
          </div>
          <div className="payment_detail">
            <form onSubmit={handlesubmit}>
              <CardElement onChange={handlechange} />

              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={getbaskettotal(basket)}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
              />
              <button
                className="paymnet_butn"
                disabled={disable || processing || success}
              >
                <span>{processing ? <p>processing</p> : "Buy Now"}</span>
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
