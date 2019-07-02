import { INITIATE_USERS, UPDATE_USER, DELETE_USER } from "../constants";

const INITIAL_STATE = { users: [] };

const updateOne = (data, payload) =>
  data.map(item => {
    if (item.id !== payload.id) {
      return item;
    }
    return {
      ...item,
      ...payload
    };
  });

const deleteOne = (data, payload) => {
  const updated = data.filter(user => user.id !== payload);

  return [...updated];
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIATE_USERS:
      return { data: action.payload };
    case UPDATE_USER:
      return {
        data: updateOne(state.data, action.payload)
      };
    case DELETE_USER:
      return {
        ...state,
        data: deleteOne(state.data, action.payload)
      };
    default:
      return state;
  }
}
