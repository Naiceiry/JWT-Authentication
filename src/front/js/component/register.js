import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="containerFormSignin">
      <form>
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
          <h1>Repeat Email address</h1>
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
        <div class="form-group">
          <h1>Repeat Password</h1>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="form-group">
          <h1>Full Name</h1>
          <input type="name" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="form-group">
          <h1>Address</h1>
          <input
            type="address"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="form-group">
          <h1>Phone</h1>
          <input type="phone" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-warning ">
          Submit
        </button>
      </form>
    </div>
  );
};
