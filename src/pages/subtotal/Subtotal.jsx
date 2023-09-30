import React from "react";
import CurrencyFormat from "react-currency-format";

import "./subtotal.css";
import { useStateValue } from "../../components/StateProvider/StateProvider";

function Subtotal() {
  const [{ basket }, dispach] = useStateValue();
  const getbaskettotal = (basket) =>
    basket?.reduce((amount, items) => amount + items.price, 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
              <small className="subtotal_gift">
                <input type="checkbox" /> This order contain a gift
              </small>
            </p>
          </div>
        )}
        decimalScale={2}
        value={getbaskettotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
