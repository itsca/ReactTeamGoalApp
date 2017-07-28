import { combineReducers } from 'redux';
import user from './reducer_user.js';
import userTeams from './reducer_user_teams.js';
import goals from './reducer_goals.js';
import completeGoals from './reducer_completed_goals.js';


export default combineReducers({
  user,
  userTeams,
  goals,
  completeGoals
})
