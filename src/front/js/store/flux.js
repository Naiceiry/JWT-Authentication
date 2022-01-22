const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: [],
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

      signup: async (formValue) => {
        const store = getStore();

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
          redirect: "follow",
        };

        try {
          console.log("AQUI ENTRA FLUX L32");
          const response = await fetch(
            `${API_BASE_URL}/api/signup`,
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
