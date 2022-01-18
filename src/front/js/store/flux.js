const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: [],
    },
    actions: {
      getLocalStore: () => {
        const tmpStore = {};
        paramValue = JSON.parse(localStorage.getItem(paramName)) || "";

        if (paramValue) {
          tmpStore[paramName] = paramValue;
          setStore({ myLocalStore: tmpStore });
        }
      },

      signup: async (formValue) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `${API_BASE_URL}/api/signup`,
            requestOptions
          );
          if (response.status === 401) {
            const errorMsg = await response.json();
            console.log("algo esta mal linea 22 flux");
            throw new Error(errorMsg);
          } else {
            const newStore = await response.json();
            setStore({ user: newStore });
            localStorage.setItem("user", JSON.stringify(newStore.user));
            console.log("guardado");
          }
        } catch (error) {
          return error.message;
        }
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
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
