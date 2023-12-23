// formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './InitialState/formInitialState';
import { IFormData } from '../types/formTypes';

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateMainForm: (state, action: PayloadAction<{ phoneNumber: string; email: string }>) => {
      state.mainForm.phoneNumber = action.payload.phoneNumber;
      state.mainForm.email = action.payload.email;
    },
    updateStepOneData: (
      state,
      action: PayloadAction<{ nickname: string; name: string; sername: string; sex: string }>,
    ) => {
      state.stepOneData.nickname = action.payload.nickname;
      state.stepOneData.name = action.payload.name;
      state.stepOneData.sername = action.payload.sername;
      state.stepOneData.sex = action.payload.sex;
    },
    updateStepTwoData: (state, action: PayloadAction<IFormData['stepTwoData']>) => {
      state.stepTwoData = action.payload;
    },
    updateStepThreeData: (state, action: PayloadAction<IFormData['stepThreeData']>) => {
      state.stepThreeData = action.payload;
    },
    modalStateChange: (state) => {
      state.active = !state.active;
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const {
  updateMainForm,
  updateStepOneData,
  updateStepTwoData,
  updateStepThreeData,
  modalStateChange,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
