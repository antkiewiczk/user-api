import { INITIATE_USERS, UPDATE_USER, DELETE_USER } from "../constants";

function addInitialUserData(users) {
  return dispatch => {
    dispatch({
      type: INITIATE_USERS,
      payload: users
    });
  };
}

function updateUser(user) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER,
      payload: user
    });
  };
}

function deleteUser(id) {
  return dispatch => {
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  };
}

export { addInitialUserData, updateUser, deleteUser };
