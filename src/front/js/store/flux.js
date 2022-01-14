const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: [],
    },
    actions: {
      signin: async (formValue) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValue),
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `${API_BASE_URL}/api/signin`,
            requestOptions
          );
          console.log("entre al flux linea 57");
          if (response.status === 401) {
            const errorMsg = await response.json();
            console.log("entre al flux linea 60");
            throw new Error(errorMsg);
          } else {
            const newStore = await response.json();
            setStore({ user: newStore });
            localStorage.setItem("user", JSON.stringify(newStore.user));
            console.log("entre al flux linea 66");
          }
        } catch (error) {
          console.log("entre al flux linea 69");
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
