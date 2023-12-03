import * as yup from 'yup';
import { Gender } from '@/redux/features/common';
import { store } from '@/redux/store';

export const formSchema = yup.object({
  name: yup
    .string()
    .required()
    .trim()
    .test('nameFirstLetterCapital', 'First letter must be capitalized', async (value, context) => {
      try {
        await yup.string().min(3).validate(value);
        return value[0] === value[0].toUpperCase();
      } catch (e) {
        const message = (e as yup.ValidationError).message;
        return context.createError({ message });
      }
    }),
  age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .trim()
    .required()
    .test(
      'passwordStrength',
      "Must include at least one uppercase letter, one lowercase letter, one digit and one special symbol ('@', '#', '$', '&', '!', '*')",
      (value) => {
        if (!value) {
          return true;
        }
        const conditions = {
          uppercase: false,
          lowercase: false,
          digit: false,
          special: false,
        };
        for (const character of value) {
          if (character === character.toLowerCase()) {
            conditions.lowercase = true;
          }

          if (character === character.toUpperCase()) {
            conditions.uppercase = true;
          }

          if (Number.parseInt(character)) {
            conditions.digit = true;
          }

          if (['@', '#', '$', '&', '!', '*'].includes(character)) {
            conditions.special = true;
          }
        }
        return Object.values(conditions).every((item) => item);
      },
    ),
  passwordConfirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')])
    .required(),
  gender: yup.mixed().oneOf(Object.values(Gender)),
  doesAcceptTC: yup.bool(),
  picture: yup
    .mixed()
    .required()
    .test('fileSize', 'File size must be smaller than 5MiB', (value) => {
      const file = value as File | undefined;
      if (file) {
        return file.size < 5 * 1024 * 1024;
      }
    })
    .test('fileExtension', 'File extension must be jpeg or png', (value) => {
      const file = value as File | undefined;
      if (file) {
        return ['image/jpeg', 'image/png'].includes(file.type);
      }
    }),
  country: yup.string().oneOf(store.getState().sharedSlice.countries),
});
