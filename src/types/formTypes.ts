export interface IFormData {
  mainForm: {
    phoneNumber: string;
    email: string;
  };
  stepOneData: {
    nickname: string;
    name: string;
    sername: string;
    sex: string;
  };
  stepTwoData: {
    advantages: Array<{ id: string; value: string }>;
    checkboxName1: boolean;
    checkboxName2: boolean;
    checkboxName3: boolean;
    radioGroupName: string;
  };
  stepThreeData: {
    about: string;
  };
  active: boolean;
  resetForm: () => IFormData;
}

export interface IDataForApi {
  phoneNumber: string;
  email: string;
  nickname: string;
  name: string;
  sername: string;
  sex: string;
  advantages: Array<{ id: string; value: string }>;
  checkboxName1: boolean;
  checkboxName2: boolean;
  checkboxName3: boolean;
  radioGroupName: string;
  about: string;
}
