import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

const notesSlicer = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNotes: (state, {payload}) => {
      const oldNotes = [...state.notes];
      const findIfNotesIsAlreadyAdd = oldNotes.find(
        note => note.savedAt === payload.savedAt,
      );
      if (findIfNotesIsAlreadyAdd) {
        return {
          ...state,
          notes: oldNotes.map(note => {
            if (note.savedAt === payload.savedAt) {
              return payload;
            } else {
              return note;
            }
          }),
        };
      } else {
        return {
          ...state,
          notes: [payload, ...state.notes],
        };
      }
    },
    editNotes: (state, {payload}) => {
      const oldNotes = [...state.notes];
      return {
        ...state,
        notes: oldNotes.map(note => {
          if (note.savedAt === payload.savedAt) {
            return payload;
          } else {
            return note;
          }
        }),
      };
    },
    removeNotesById: (state, {payload}) => {
      const oldNotes = [...state.notes];
      oldNotes.splice(payload, 1);
      return {
        ...state,
        notes: oldNotes,
      };
    },
    removeAllNotes: state => {
      return {
        ...state,
        notes: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {addNotes, editNotes, removeNotesById, removeAllNotes} =
  notesSlicer.actions;

export default notesSlicer.reducer;
