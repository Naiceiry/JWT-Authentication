import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Signup = () => {
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
    console.log("entre a handlersubmit");
    e.preventDefault(); //CANCELA EL EVENTO SI ES CANCELABLE
    // login function
    let loginError = await actions.login(formValue);
    //actions.getLocalStore();

    if (loginError) {
      console.log("estoy el signup linea 14");
      setErrorMsg(loginError);
    } else {
      console.log("estoy el signup linea 16");
    }
  };
  return (
    <div className="containerFormSignup">
      <form
        onSubmit={handlerSubmit}
        className="col-12 p-5 myBox text-white"
        id="loginForm"
      >
        <div class="form-group">
          <h1>Email address</h1>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <h1>Password</h1>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
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
