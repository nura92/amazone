import React, { useState } from "react";
import "./login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { firebaseAuth } from "../../util/Firebaseconfig";
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn =  (e) => {
    e.preventDefault;
    signInWithEmailAndPassword(firebaseAuth,Email,Password)
    .then((curentuser)=>{
      if(curentuser) navigate('/')
    })
    .catch((error)=> alert(error.message))
   
  };
  const register =  (e) => {
    e.preventDefault;
   createUserWithEmailAndPassword(firebaseAuth,Email,Password)
   .then((curentuser)=>{
    if(curentuser) navigate('/')
   })
   .catch((error)=> alert(error.message))
  };
 
  return (
    <div className="login">
      <div className="login__container ">
        <Link to='/'>
        
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322"
          alt=""
        />
        </Link>
        <h1>sign in</h1>
        <form action="#">
          <h5>email</h5>

          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            required
          />

          <h5>password</h5>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
            required
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            sign in
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButton ">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
