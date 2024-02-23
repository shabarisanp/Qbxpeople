// rootReducer.js
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './Slices/authSlices';
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export default rootReducer;
