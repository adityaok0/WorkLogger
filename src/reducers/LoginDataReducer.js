let defaultState = { email: null, password: null };
const LoginDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN_DATA": {
      let temp = { ...state };
      temp[action.payload.type] = action.payload.value;
      return temp;
    }
    default:
      return state;
  }
};
export default LoginDataReducer;
