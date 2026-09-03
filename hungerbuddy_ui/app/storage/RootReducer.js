const initailState = {
  cart: {},
  user: {},
  studentList: [],
  selectedStudent: null
};

function RootReducer(state = initailState, action) {
  switch (action.type) {
    case "ADD_CART": {
      const newCart = { ...state.cart, [action.payload[0]]: action.payload[1] };
      if (typeof window !== 'undefined') localStorage.setItem("CART", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "ADD_USER": {
      const newUser = { ...state.user, [action.payload[0]]: action.payload[1] };
      if (typeof window !== 'undefined') localStorage.setItem("USER", JSON.stringify(newUser));
      return { ...state, user: newUser };
    }
    case "DELETE_CART": {
      const newCart = { ...state.cart };
      delete newCart[action.payload[0]];
      if (typeof window !== 'undefined') localStorage.setItem("CART", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "EMPTY_CART":
      if (typeof window !== 'undefined') localStorage.setItem("CART", JSON.stringify({}));
      return { ...state, cart: {} };
    case "SET_STUDENT_LIST":
      return { ...state, studentList: action.payload || [] };
    case "SELECT_STUDENT":
      return { ...state, selectedStudent: action.payload || null };
    case "USER_LOGOUT":
      if (typeof window !== 'undefined') {
        localStorage.setItem("CART", JSON.stringify({}));
        localStorage.setItem("USER", JSON.stringify({}));
      }
      return { cart: {}, user: {}, studentList: [], selectedStudent: null };
    default:
      return state;
  }
}

export default RootReducer;
