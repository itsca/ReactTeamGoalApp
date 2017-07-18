import { SET_GOALS } from '../constants/constants.js';

export default (state = [], action) => {
  switch (action.type) {
    case SET_GOALS:
        const { goals } = action;
        return goals;
      break;
    default:
      return state;
  }
}
