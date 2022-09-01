import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import search from './search';

export default combineReducers({
  auth,
  news,
  search,
});
