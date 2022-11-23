import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  savedArticles: [],
};

const savedArticlesSlicer = createSlice({
  name: 'savedArticles',
  initialState,
  reducers: {
    addSavedArticle: (state, {payload}) => {
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
    removeSavedArticleById: (state, {payload: id}) => {
      const copyArticles = [...state.savedArticles];
      copyArticles.splice(id, 1);
      return {
        ...state,
        savedArticles: copyArticles,
      };
    },
    removeAllSavedArticles: state => {
      return {
        ...state,
        savedArticles: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {addSavedArticle, removeSavedArticleById, removeAllSavedArticles} =
  savedArticlesSlicer.actions;

export default savedArticlesSlicer.reducer;
