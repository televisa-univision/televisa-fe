import { createSlice } from '@reduxjs/toolkit';
import reducers from './registrationReducer';

export const initialState = {
  isRegistrationOpen: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers,
});

export const {
  openRegistration,
  closeRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
