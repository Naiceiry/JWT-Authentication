import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="containerFormSignup">
			<form>
				<div class="form-group">
					<h1>Email address</h1>
					<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<small id="emailHelp" class="form-text text-white">We'll never share your email with anyone else.</small>
				</div>
				<div class="form-group">
					<h1>Password</h1>
					<input type="password" class="form-control" id="exampleInputPassword1" />
				</div>
				<div class="form-group form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" />
					<label class="form-check-label text-white" for="exampleCheck1">Check me out</label>
				</div>
				<button type="submit" class="btn btn-warning ">Submit</button>
			</form>
		</div>
	);
};
