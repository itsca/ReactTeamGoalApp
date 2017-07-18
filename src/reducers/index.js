import { combineReducers } from 'redux';
import user from './reducer_user.js';
import goals from './reducer_goals.js';


export default combineReducers({
  user,
  goals
})
