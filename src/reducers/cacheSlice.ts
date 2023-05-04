import { searchAPI } from '@/apis/search';
import { EXPIRE_TIME } from '@/constants/cache';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRelatedWordsByKeyword = createAsyncThunk(
  'cahce/fetchByKeywordStatus',
  async (keyword: string, thunkAPI) => {
    if (keyword === '') return thunkAPI.rejectWithValue('');
    const { dispatch, getState } = thunkAPI;
    const cache = getState().cache;
    if (cache[keyword] !== undefined) return { keyword, relatedWords: cache[keyword] };
    try {
      const response = await searchAPI.fetchByKeyword(keyword);
      setTimeout(() => {
        dispatch(removeRelatedWords({ keyword }));
      }, EXPIRE_TIME);
      return { keyword, relatedWords: response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface CacheState {
  name: string;
  id: number;
}

interface CacheStates {
  [key: string]: CacheState[];
}

const initialState: CacheStates = {};

export const cacheSlice = createSlice({
  name: 'cacheSlice',
  initialState,
  reducers: {
    removeRelatedWords: (state, action) => {
      const { keyword } = action.payload;

      delete state[keyword];
    },
  },
  extraReducers: {
    [fetchRelatedWordsByKeyword.fulfilled.type]: (state, action) => {
      const { keyword, relatedWords } = action.payload;
      state[keyword] = relatedWords;
    },
  },
});

export const { removeRelatedWords } = cacheSlice.actions;
export default cacheSlice.reducer;
