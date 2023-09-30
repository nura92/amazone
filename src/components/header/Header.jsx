import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";

import "./header.css";
import { useStateValue } from "../StateProvider/StateProvider";
import { firebaseAuth } from "../../util/Firebaseconfig";

function Header() {
  const [{ basket,user }, dispach] = useStateValue();
  const handleout = ()=>{
    if(user){
      firebaseAuth.signOut()
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header_search_bar">
        <input className="Header_serch_input" type="text" />
        <SearchIcon className="Search_icon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div className="header_opstion" onClick={handleout}>
            <div className="header_option_lineone">Hello {!user? 'Geust' :user?.email}</div>
            <div className="header_option_linetwo">{user? 'sign out' :'sign in' }</div>
          </div>
        </Link>
        <div className="header_opstion">
          <div className="header_option_lineone">returns</div>
          <div className="header_option_linetwo">&Orders</div>
        </div>
        <div className="header_opstion">
          <div className="header_option_lineone">your</div>
          <div className="header_option_linetwo">Prime</div>
        </div>
      </div>
      <Link to="checkouts">
        <div className="Header_basket">
          <ShoppingBasketIcon />
          <div className="header_option_linetwo header_counter">
            {basket.length}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Header;
