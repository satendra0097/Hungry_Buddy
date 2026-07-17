const initailState = {
  cart: {},
  user: {}
};

function RootReducer(state = initailState, action) {
  switch (action.type) {

    case "ADD_CART":
      state.cart[action.payload[0]] = action.payload[1];
      console.log("CART:",state.cart)
      return { cart: state.cart, user: state.user };

    case "ADD_USER": {
      const newUser = {
        ...state.user,
        [action.payload[0]]: action.payload[1]
      };
      localStorage.setItem("USER", JSON.stringify(newUser));
      return { cart: state.cart, user: newUser };
    }

    case "DELETE_CART":
      delete state.cart[action.payload[0]];
      return { cart: state.cart, user: state.user };

    case "EMPTY_CART":
      state.cart = {};
      return { cart: state.cart, user: state.user };

    default:
      return state;
  }
}

export default RootReducer;
