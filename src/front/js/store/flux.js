import { apiBaseUrl } from "../constants";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: null,
      accessToken: null,
    },
    actions: {
      getLocalStore: () => {
        const tmpStore = {};

        Object.keys(localStorage).forEach((paramName) => {
          paramValue = JSON.parse(localStorage.getItem(paramName)) || "";
          console.log("guardado");

          if (paramValue) {
            tmpStore[paramName] = paramValue;
            setStore({ myLocalStore: tmpStore });
          }
        });
      },
      /******SIGNUP *******/
      signup: async (formValue) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
        };

        try {
          const respon = await fetch(
            `${apiBaseUrl}/api/signup`,
            requestOptions
          );
          if (respon.status >= 400) {
            const errorMsg = "Error during the sign up process";
            throw new Error(errorMsg);
          } else {
            const newStore = await respon.json();
            setStore({ accessToken: newStore["access_token"] });
            localStorage.setItem(
              "token",
              JSON.stringify(newStore["access_token"])
            );
            console.log("guardadollll");
          }
        } catch (error) {
          return error.message;
        }
      },
      /******ACCESO AL TOKEN *******/
      signInUser: (formValue) => {
        var raw = JSON.stringify(formValue);
        var requestoption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        };
        fetch(apiBaseUrl + "/api/signin", requestoption)
          .then((response) => response.json())
          .then((data) => {
            setStore({ accessToken: data["access_token"] });
          })
          .catch((error) => console.log("error", error));
      },
      /****para poder verificar en cualquier si hay una sesion iniciada o no */
      /****Autheticated?**********************/
      isUserAuthenticated: () => {
        const store = getStore();
        return store.accessToken !== null;
      },
      /*****************************/
      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/admin")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      /********cerrarr sesion *****/
      logOut: () => {
        setStore({ user: null, accessToken: null });
        localStorage.clear();
      },
    },
  };
};

export default getState;
