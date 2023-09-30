import React from "react";
import "./chekout.css";
import Subtotal from "../subtotal/Subtotal";
import CheckoutProducts from "./Checkoutproduct";
import { useStateValue } from "../../components/StateProvider/StateProvider";

function Chekout() {
  const [{basket},dispatch] = useStateValue()
  return (
    <>
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="chekout_ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          <h3>Hello</h3>
          <h2 className="chekout_title"> Your Shopping Basket</h2>
          {basket.map((items)=>(

          <CheckoutProducts id={items.id}
          title={items.title}
          image={items.img}
          price={items.price} 
          rating={items.rating}/>
          ))}
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

export default Chekout;
