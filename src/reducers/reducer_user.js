import { SIGNED_IN } from '../constants/constants.js';

let user = {
  email: null
}


export default (state = user, action) => {
  switch (action.type) {
    case SIGNED_IN:
      const { email, userName, uid, userTeams} = action;
      user = {
        email,
        userName,
        userTeams,
        uid
      }
      return user;
      break;
    default:
      return state;
  }
}
