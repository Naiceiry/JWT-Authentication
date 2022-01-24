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
        const store = getStore();

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `${apiBaseUrl}/api/signup`,
            requestOptions
          );
          if (response.status >= 400) {
            const errorMsg = "Error during the sign up process";
            throw new Error(errorMsg);
          } else {
            const newStore = await response.json();
            setStore({ user: response.json() });
            localStorage.setItem("user", JSON.stringify(newStore.user));
            console.log("guardado");
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
          .then((response = response.json()))
          .then((data) => {
            debugger; /* parar ejecucion en este momento del navegador */
            setStore({ accessToken: data["accesToken"], user: data });
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
    },
  };
};

export default getState;
