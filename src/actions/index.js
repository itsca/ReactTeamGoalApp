import { SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_USER_TEAMS } from '../constants/constants.js';

export function logUser(email, userName, uid, userTeams) {
  const action = {
    type: SIGNED_IN,
    email,
    userName,
    userTeams,
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

export function setTeams(teams) {
  const action = {
    type: SET_USER_TEAMS,
    teams
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
