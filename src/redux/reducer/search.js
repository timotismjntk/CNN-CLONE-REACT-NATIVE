import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

const initialState = {
  searchNews: {},
  recentSearches: ['Indonesia', 'Real Madrid'],
  isLoadingSearchNews: false,
};

export const searchNews = createAsyncThunk(
  'search/searchNews',
  async (params = 'q=sport') => {
    const {data} = await http('https://newsapi.org/v2/everything').get(
      `?apiKey=445938e7b4214f4988780151868665cc&language=en&q=${params}`,
    );
    return data;
  },
);

const searchNewsSlicer = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearRecentSearch: (state, action) => {
      return {
        ...state,
        recentSearches: [],
      };
    },
    addRecentSearch: (state, {payload}) => {
      if (
        state.recentSearches.find(
          item => item?.toLocaleLowerCase() === payload?.toLocaleLowerCase(),
        )
      ) {
        return {
          ...state,
          recentSearches: [...state.recentSearches].sort((a, b) =>
            a?.toLocaleLowerCase() === payload?.toLocaleLowerCase() ? -1 : 1,
          ),
        };
      } else {
        return {
          ...state,
          recentSearches: [payload, ...state.recentSearches],
        };
      }
    },
    clearSearchResult: (state, action) => {
      return {
        ...state,
        searchNews: {},
      };
    },
  },
  extraReducers: {
    [searchNews.pending]: state => {
      return {
        ...state,
        isLoadingSearchNews: true,
      };
    },
    [searchNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingSearchNews: false,
        searchNews: payload,
      };
    },
    [searchNews.rejected]: state => {
      return {
        ...state,
        isLoadingSearchNews: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearRecentSearch, addRecentSearch, clearSearchResult} =
  searchNewsSlicer.actions;

export default searchNewsSlicer.reducer;
