// app/storage/actions.js

// ========== CART ACTIONS ==========
export const addCart = (key, value) => ({
  type: "ADD_CART",
  payload: [key, value]
});

export const deleteCart = (key) => ({
  type: "DELETE_CART",
  payload: [key]
});

export const emptyCart = () => ({
  type: "EMPTY_CART"
});

// ========== USER ACTIONS ==========
export const addUser = (key, value) => ({
  type: "ADD_USER",
  payload: [key, value]
});

// ========== STUDENT ACTIONS ==========
export const setStudentList = (students) => ({
  type: "SET_STUDENT_LIST",
  payload: students
});

export const selectStudent = (student) => ({
  type: "SELECT_STUDENT",
  payload: student
});