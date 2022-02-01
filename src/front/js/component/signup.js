import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { apiBaseUrl } from "../constants";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({
    fullname: "",
    address: "",
    email: "",
    emailr: "",
    password: "",
    passwordr: "",
    phone: "",
  });
  let history = useHistory();
  const inputHandelChange = (e) => {
    //"[e.target.name]" is the name of form inputs
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (formValue.email == formValue.emailr) {
      if (formValue.password == formValue.passwordr) {
        alert("Registro Exitoso, adelante");
        if (actions.signup(formValue)) {
          history.push("/enter");
        } else {
          alert("Hay un problema , no se pudo guardar");
        }
      } else {
        alert("password y repetir password deben ser iguales");
      }
    } else {
      alert("emails y repetir email deben ser iguales");
    }
  };

  return (
    <div className="containerFormSignin">
      <form
        onSubmit={handlerSubmit}
        className="col-12 p-5 text-white formSignUp"
      >
        <div className="form-group">
          <h1>Email address</h1>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={inputHandelChange}
            autoFocus
            required
          />
          <small id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <h1>Repeat Email address</h1>
          <input
            name="emailr"
            type="email"
            className="form-control"
            id="emailr"
            aria-describedby="emailHelp"
            onChange={inputHandelChange}
            required
          />
          <small id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <h1>Password</h1>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div className="form-group">
          <h1>Repeat Password</h1>
          <input
            name="passwordr"
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div className="form-group">
          <h1>Full Name</h1>
          <input
            name="fullname"
            type="name"
            className="form-control"
            id="exampleInputPassword12"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div className="form-group">
          <h1>Address</h1>
          <input
            name="address"
            type="address"
            className="form-control"
            id="exampleInputPassword1ff2"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div className="form-group">
          <h1>Phone</h1>
          <input
            name="phone"
            type="phone"
            className="form-control"
            id="exampleInputPassword1111"
            onChange={inputHandelChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning ">
          Submit
        </button>
      </form>
    </div>
  );
};
