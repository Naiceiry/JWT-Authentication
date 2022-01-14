import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Signin = () => {
  const { actions } = useContext(Context);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const inputHandelChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    console.log("entre a handlersubmit e singin");
    e.preventDefault(); //CANCELA EL EVENTO SI ES CANCELABLE
    // login function
    let loginError = await actions.signin(formValue);
    //actions.getLocalStore();

    if (loginError) {
      console.log("estoy el signin linea 25");
      setErrorMsg(loginError);
    } else {
      console.log("estoy el signin linea 16");
    }
  };
  return (
    <div className="containerFormSignin">
      <form
        onSubmit={handlerSubmit}
        className="col-12 p-5 myBox text-white"
        id="loginForm"
      >
        <div class="form-group">
          <h2>Email address</h2>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={inputHandelChange}
          />
          <small id="emailHelp" class="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <h2>Password</h2>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label text-white" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-warning ">
          Submit
        </button>
      </form>
    </div>
  );
};
