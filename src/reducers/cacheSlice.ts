import { searchAPI } from '@/apis/search';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRelatedWordsByKeyword = createAsyncThunk(
  'cahce/fetchByKeywordStatus',
  async (keyword: string, thunkAPI) => {
    if (keyword === '') return thunkAPI.rejectWithValue('');
    try {
      console.info('calling api');
      const response = await searchAPI.fetchByKeyword(keyword);
      return { keyword, relatedWords: response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface CacheState {
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
    storeRelatedWords: (state, action) => {
      const { keyword, relatedWords } = action.payload;
      state[keyword] = relatedWords;
    },
  },
  extraReducers: {
    [fetchRelatedWordsByKeyword.fulfilled.type]: (state, action) => {
      const { keyword, relatedWords } = action.payload;
      state[keyword] = relatedWords;
    },
  },
});

export default cacheSlice.reducer;
