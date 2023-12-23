import { IFormData } from '../../types/formTypes';

export const initialState: IFormData = {
  mainForm: {
    phoneNumber: '',
    email: '',
  },
  stepOneData: {
    nickname: '',
    name: '',
    sername: '',
    sex: '',
  },
  stepTwoData: {
    advantages: [
      { id: '', value: '' },
      { id: '', value: '' },
      { id: '', value: '' },
    ],
    checkboxName1: false,
    checkboxName2: false,
    checkboxName3: false,
    radioGroupName: '',
  },
  stepThreeData: {
    about: '',
  },
  active: false,
  resetForm: () => initialState,
};
