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
        note =>
          note.savedAt === payload.savedAt &&
          note.title === payload.title &&
          note.content === payload.content,
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
      const filteredNotes = [...state.notes].filter(
        note => note.id !== payload.id,
      ); // first to remove the edited notes
      const sortedNotes = [payload, ...filteredNotes]; // then concat the edited notes to be first index
      return {
        ...state,
        notes: sortedNotes,
      };
    },
    sortNotesByDragnDrop: (state, {payload}) => {
      if (Array.isArray(payload) && payload?.length > 0) {
        return {
          ...state,
          notes: payload,
        };
      }
    },
    removeNotesById: (state, {payload: id}) => {
      const oldNotes = [...state.notes];
      oldNotes.splice(id, 1);
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
export const {
  addNotes,
  editNotes,
  sortNotesByDragnDrop,
  removeNotesById,
  removeAllNotes,
} = notesSlicer.actions;

export default notesSlicer.reducer;
