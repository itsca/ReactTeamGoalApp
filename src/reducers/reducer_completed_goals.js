import { SET_COMPLETED } from '../constants/constants.js';

export default (state = [], action) => {
  switch (action.type) {
    case SET_COMPLETED:
        const { completeGoals } = action;
        return completeGoals;
    default:
      return state;
  }
}
