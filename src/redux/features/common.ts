import { PayloadAction } from '@reduxjs/toolkit';

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
}

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: Gender;
  doesAcceptTC: boolean;
  picture: string;
  country: string;
  isUpdated?: boolean;
}

export const initialFormState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  passwordConfirmation: '',
  gender: Gender.FEMALE,
  doesAcceptTC: false,
  picture: '',
  country: '',
};

export const formReducers = {
  changeState: (_: FormState, action: PayloadAction<FormState>) => {
    return action.payload;
  },
  changeName: (state: FormState, action: PayloadAction<string>) => {
    state.name = action.payload;
  },
  changeEmail: (state: FormState, action: PayloadAction<string>) => {
    state.email = action.payload;
  },

  changeAge: (state: FormState, action: PayloadAction<number>) => {
    state.age = action.payload;
  },
  changeGender: (state: FormState, action: PayloadAction<Gender>) => {
    state.gender = action.payload;
  },
  changePassword: (state: FormState, action: PayloadAction<string>) => {
    state.password = action.payload;
  },
  changePasswordConfirmation: (state: FormState, action: PayloadAction<string>) => {
    state.passwordConfirmation = action.payload;
  },
  changeDoesAcceptTC: (state: FormState, action: PayloadAction<boolean>) => {
    state.doesAcceptTC = action.payload;
  },
  changePicture: (state: FormState, action: PayloadAction<string>) => {
    state.picture = action.payload;
  },
  changeCountry: (state: FormState, action: PayloadAction<string>) => {
    state.country = action.payload;
  },
  changeIsUpdated: (state: FormState, action: PayloadAction<boolean>) => {
    state.isUpdated = action.payload;
  },
};
