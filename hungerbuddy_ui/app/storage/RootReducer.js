// app/storage/RootReducer.js

const initailState = {
  cart: {},
  user: {},
  studentList: [],       // ✅ Added: All students list
  selectedStudent: null  // ✅ Added: Currently selected student
};

function RootReducer(state = initailState, action) {
  switch (action.type) {

    // ========== YOUR EXISTING CODE - NO CHANGE ==========
    case "ADD_CART": {
      const newCart = {
        ...state.cart,
        [action.payload[0]]: action.payload[1]
      };

      return {
        cart: newCart,
        user: state.user,
        studentList: state.studentList,
        selectedStudent: state.selectedStudent
      };
    }

    case "ADD_USER": {
      const newUser = {
        ...state.user,
        [action.payload[0]]: action.payload[1]
      };

      console.log("NEW USER:", newUser);

      localStorage.setItem(
        "USER",
        JSON.stringify(newUser)
      );

      return {
        cart: state.cart,
        user: newUser,
        studentList: state.studentList,
        selectedStudent: state.selectedStudent
      };
    }

    case "DELETE_CART": {
      const newCart = { ...state.cart };
      delete newCart[action.payload[0]];

      return {
        cart: newCart,
        user: state.user,
        studentList: state.studentList,
        selectedStudent: state.selectedStudent
      };
    }

    case "EMPTY_CART":
      return {
        cart: {},
        user: state.user,
        studentList: state.studentList,
        selectedStudent: state.selectedStudent
      };

    // ========== ✅ NEW: STUDENT ACTIONS ==========
    
    case "SET_STUDENT_LIST": {
      return {
        cart: state.cart,
        user: state.user,
        studentList: action.payload || [],
        selectedStudent: state.selectedStudent
      };
    }

    case "SELECT_STUDENT": {
      return {
        cart: state.cart,
        user: state.user,
        studentList: state.studentList,
        selectedStudent: action.payload || null
      };
    }

    case "USER_LOGOUT":
      return {
        cart: {},
        user: {},
        studentList: [],
        selectedStudent: null
      };

    default:
      return state;
  }
}

export default RootReducer;