import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import descarga from "../../img/descarga.jpg";
import "../../styles/home.css";

export const Enter = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const goodbye = () => {
    actions.logOut();
    actions.getLocalStore();
    history.push("/");
  };
  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={descarga} />
      </p>
      <div className="alert alert-info">
        <h1> estas dentro </h1>
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
          Read documentation
        </a>
      </p>
      <button onClick={() => goodbye()}> Log Out</button>
    </div>
  );
};
