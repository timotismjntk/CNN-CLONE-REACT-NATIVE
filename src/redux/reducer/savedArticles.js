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
        return {
          ...state,
          savedArticles: [...state.savedArticles].reduce(
            (result, item, index) => {
              if (index !== findArticle) {
                result.push(item);
              }
              return result;
            },
            [],
          ),
        };
      } else {
        return {
          ...state,
          savedArticles: [payload, ...state.savedArticles],
        };
      }
    },
    removeArticleById: (state, action) => {
      return {
        ...state,
        savedArticles: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {addArticle, removeArticleById} = savedArticlesSlicer.actions;

export default savedArticlesSlicer.reducer;
