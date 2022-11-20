import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import search from './search';
import savedArticles from './savedArticles';
import notes from './notes';

export default combineReducers({
  auth,
  news,
  search,
  savedArticles,
  notes,
});
