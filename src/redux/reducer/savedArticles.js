import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  savedArticles: [],
};

const savedArticlesSlicer = createSlice({
  name: 'savedArticles',
  initialState,
  reducers: {
    addArticle: (state, {payload}) => {
      const findArticle = state.savedArticles.findIndex(
        article =>
          article.title === payload.title &&
          article.publishedAt === payload.publishedAt,
      );
      if (findArticle > -1) {
        const copyArticles = [...state.savedArticles];
        copyArticles.splice(findArticle, 1);
        return {
          ...state,
          savedArticles: copyArticles,
        };
      } else {
        return {
          ...state,
          savedArticles: [payload, ...state.savedArticles],
        };
      }
    },
    removeArticleById: (state, {payload}) => {
      const copyArticles = [...state.savedArticles];
      copyArticles.splice(payload, 1);
      return {
        ...state,
        savedArticles: copyArticles,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {addArticle, removeArticleById} = savedArticlesSlicer.actions;

export default savedArticlesSlicer.reducer;
