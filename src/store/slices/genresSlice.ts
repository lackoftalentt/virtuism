import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  activeGenre: number | null;
}

interface GenresState {
  movies: CategoryState;
  tv: CategoryState;
}

const initialState: GenresState = {
  movies: {
    activeGenre: null,
  },
  tv: {
    activeGenre: null,
  },
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setActiveGenre: (
      state,
      action: PayloadAction<{ category: keyof GenresState; id: number }>
    ) => {
      const { category, id } = action.payload;
      state[category].activeGenre = id;
    },
    clearActiveGenre: (
      state,
      action: PayloadAction<{ category: keyof GenresState }>
    ) => {
      const { category } = action.payload;
      state[category].activeGenre = null;
    },
  },
});

export const { setActiveGenre, clearActiveGenre } = genresSlice.actions;

export default genresSlice.reducer;
