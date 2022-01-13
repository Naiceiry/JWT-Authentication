const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getLocalStore: () => {
        const tmpStore = {};
        console.log("entre a getlocals");
        // "loglevel:webpack-dev-server" es una propiedad del LocalStorage, si se deja, revienta todo
        const blackList = ["loglevel", "mapbox"];
        const blackRegex = new RegExp(`${blackList.join("|")}`);

        Object.keys(localStorage).forEach((paramName) => {
          if (!blackRegex.test(paramName)) {
            const paramValue =
              JSON.parse(localStorage.getItem(paramName)) || "";

            if (paramValue) {
              tmpStore[paramName] = paramValue;
              setStore({ myLocalStore: tmpStore });
            }
          }
        });
      },

      login: async (formValue) => {
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
          console.log("entre 1");
          if (response.status === 401) {
            const errorMsg = await response.json();
            console.log("entre 2");
            throw new Error(errorMsg);
          } else {
            const newStore = await response.json();
            setStore({ user: newStore });
            localStorage.setItem("user", JSON.stringify(newStore.user));
            console.log("entre 3");
          }
        } catch (error) {
          console.log("entre 4");
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
