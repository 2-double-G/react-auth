import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { usersReducer } from './users';
import { searchReducer } from './search';
import { filterReducer } from './filter';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  search: searchReducer,
  filter: filterReducer
});