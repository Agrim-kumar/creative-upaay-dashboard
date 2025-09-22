import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    priority: 'all',
    category: 'all',
    assignee: 'all',
    searchTerm: '',
  },
  reducers: {
    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setAssigneeFilter: (state, action) => {
      state.assignee = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.priority = 'all';
      state.category = 'all';
      state.assignee = 'all';
      state.searchTerm = '';
    },
  },
});

export const {
  setPriorityFilter,
  setCategoryFilter,
  setAssigneeFilter,
  setSearchTerm,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;