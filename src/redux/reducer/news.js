import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

const initialState = {
  topNews: {},
  generalNews: {},
  sportNews: {},
  technology: {},
  scienceNews: {},
  entertainmentNews: {},
  businessNews: {},
  isLoadingTopNews: false,
  isLoadingGeneralNews: false,
  isLoadingSportNews: false,
  isLoadingTechnologyNews: false,
  isLoadingScienceNews: false,
  isLoadingEntertainmentNews: false,
  isLoadingBusinessNews: false,
};

export const topNews = createAsyncThunk(
  'news/topNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&country=us&language=en&pageSize=100&page=1',
  ) => {
    // top-headlines?country=us
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const generalNews = createAsyncThunk(
  'news/generalNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=general&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const sportNews = createAsyncThunk(
  'news/sportNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=sports&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const technologyNews = createAsyncThunk(
  'news/technologyNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=technology&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const scienceNews = createAsyncThunk(
  'news/scienceNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=science&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const entertainmentNews = createAsyncThunk(
  'news/entertainmentNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=entertainment&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

export const businessNews = createAsyncThunk(
  'news/businessNews',
  async (
    params = '?apiKey=445938e7b4214f4988780151868665cc&category=business&language=en&pageSize=100&page=1',
  ) => {
    const {data} = await http('https://newsapi.org/v2/top-headlines').get(
      params,
    );
    return data;
  },
);

const newsSlicer = createSlice({
  name: 'berita',
  initialState,
  reducers: {
    clearTopNews: (state, action) => {
      return {
        ...state,
        topNews: {},
        isLoadingTopNews: false,
      };
    },
    cleargeneralNews: (state, action) => {
      return {
        ...state,
        generalNews: {},
        isLoadingGeneralNews: false,
      };
    },
  },
  extraReducers: {
    [topNews.pending]: state => {
      return {
        ...state,
        isLoadingTopNews: true,
        topNews: {},
      };
    },
    [topNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingTopNews: false,
        topNews: payload,
      };
    },
    [topNews.rejected]: state => {
      return {
        ...state,
        isLoadingTopNews: false,
      };
    },
    [generalNews.pending]: state => {
      return {
        ...state,
        isLoadingGeneralNews: true,
        generalNews: {},
      };
    },
    [generalNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingGeneralNews: false,
        generalNews: payload,
      };
    },
    [generalNews.rejected]: state => {
      return {
        ...state,
        isLoadingGeneralNews: false,
      };
    },
    [sportNews.pending]: state => {
      return {
        ...state,
        isLoadingSportNews: true,
        sportNews: {},
      };
    },
    [sportNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingSportNews: false,
        sportNews: payload,
      };
    },
    [sportNews.rejected]: state => {
      return {
        ...state,
        isLoadingSportNews: false,
      };
    },
    [technologyNews.pending]: state => {
      return {
        ...state,
        isLoadingTechnologyNews: true,
        technologyNews: {},
      };
    },
    [technologyNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingTechnologyNews: false,
        technologyNews: payload,
      };
    },
    [technologyNews.rejected]: state => {
      return {
        ...state,
        isLoadingTechnologyNews: false,
      };
    },
    [scienceNews.pending]: state => {
      return {
        ...state,
        isLoadingScienceNews: true,
        scienceNews: {},
      };
    },
    [scienceNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingScienceNews: false,
        scienceNews: payload,
      };
    },
    [scienceNews.rejected]: state => {
      return {
        ...state,
        isLoadingScienceNews: false,
      };
    },
    [entertainmentNews.pending]: state => {
      return {
        ...state,
        isLoadingEntertainmentNews: true,
        entertainmentNews: {},
      };
    },
    [entertainmentNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingEntertainmentNews: false,
        entertainmentNews: payload,
      };
    },
    [entertainmentNews.rejected]: state => {
      return {
        ...state,
        isLoadingEntertainmentNews: false,
      };
    },
    [businessNews.pending]: state => {
      return {
        ...state,
        isLoadingBusinessNews: true,
        businessNews: {},
      };
    },
    [businessNews.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBusinessNews: false,
        businessNews: payload,
      };
    },
    [businessNews.rejected]: state => {
      return {
        ...state,
        isLoadingBusinessNews: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearTopNews} = newsSlicer.actions;

export default newsSlicer.reducer;
