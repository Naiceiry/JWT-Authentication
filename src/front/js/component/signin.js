import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { apiBaseUrl } from "../constants";

export const Signin = () => {
  const { actions } = useContext(Context);
  const [formValue, setFormValue] = useState({
    email_request: "",
    password_request: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const inputHandelChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    console.log("entre a handlersubmit e singin");
    e.preventDefault(); //evita que el form se envie. no se recarga la pagina
    actions.signInUser(formValue);
  };

  let history= useHistory();
  if(actions.isUserAuthenticated()){
    console.log("Inicio de sesion exitoso!");
    history.push("/enter")
  }
  return (
    <div className="containerFormSignin">
      <form
        onSubmit={handlerSubmit}
        className="col-12 p-5 myBox text-white"
        id="loginForm"
      >
        <div className="form-group">
          <h2>Email address</h2>
          <input
            name="email_request"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={inputHandelChange}
          />
          <small id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <h2>Password</h2>
          <input
            name="password_request"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label text-white">Check me out</label>
        </div>
        <button type="submit" className="btn btn-warning ">
          Submit
        </button>
      </form>
    </div>
  );
};
