import { SET_USER_TEAMS } from '../constants/constants.js';


export default (state = [], action) => {
  switch (action.type) {
    case SET_USER_TEAMS:
        const { teams } = action;
        return teams;
      break;
    default:
      return state;
  }
}
