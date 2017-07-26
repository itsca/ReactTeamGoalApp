import { SIGNED_IN, SET_GOALS, SET_COMPLETED } from '../constants/constants.js';

export function logUser(email, userName, uid) {
  const action = {
    type: SIGNED_IN,
    email,
    userName,
    uid
  }
  return action;
}

export function setGoals(goals) {
  const action = {
    type: SET_GOALS,
    goals
  }
  return action;
}

export function setCompleted(completeGoals) {
  const action = {
    type: SET_COMPLETED,
    completeGoals
  }
  return action;
}
