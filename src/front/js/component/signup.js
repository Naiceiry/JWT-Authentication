import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const { user_id } = useParams();
  const closeBtn = useRef(null);
  const [formValue, setFormValue] = useState({
    fullname: "",
    address: "",
    email: "",
    password: "",
    phone: "",
  });

  const inputHandelChange = (e) => {
    //"[e.target.name]" is the name of form inputs
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const signUpError = await actions.signup(formValue);
    actions.getLocalStore();

    if (!signUpError) {
      history.push(`/signup/${JSON.parse(localStorage.getItem("user")).id}`);
    }
  };

  return (
    <div className="containerFormSignin">
      <form
        onSubmit={handlerSubmit}
        className="col-12 p-5 text-white formSignUp"
      >
        <div class="form-group">
          <h1>Email address</h1>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={inputHandelChange}
            autoFocus
            required
          />
          <small id="emailHelp" class="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <h1>Repeat Email address</h1>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <small id="emailHelp" class="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <h1>Password</h1>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div class="form-group">
          <h1>Repeat Password</h1>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div class="form-group">
          <h1>Full Name</h1>
          <input
            name="fullname"
            type="name"
            class="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div class="form-group">
          <h1>Address</h1>
          <input
            name="address"
            type="address"
            class="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
            required
          />
        </div>
        <div class="form-group">
          <h1>Phone</h1>
          <input
            name="phone"
            type="phone"
            class="form-control"
            id="exampleInputPassword1"
            onChange={inputHandelChange}
            required
          />
        </div>
        <button type="submit" class="btn btn-warning ">
          Submit
        </button>
      </form>
    </div>
  );
};
