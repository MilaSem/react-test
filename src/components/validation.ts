import * as yup from 'yup';
import { FormState, Gender } from '@/redux/features/common';
import { store } from '@/redux/store';

export interface LocalFormState extends Omit<FormState, 'picture'> {
  picture: FileList;
}

const FIELD_IS_REQUIRED_MESSAGE = 'field is required';

export const formSchema = yup.object({
  name: yup
    .string()
    .required(FIELD_IS_REQUIRED_MESSAGE)
    .trim()
    .test('nameFirstLetterCapital', 'first letter must be capitalized', async (value, context) => {
      try {
        await yup.string().min(3).validate(value);
        return value[0] === value[0].toUpperCase();
      } catch (e) {
        const message = (e as yup.ValidationError).message;
        return context.createError({ message });
      }
    }),
  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .required()
    .positive('must be positive number')
    .integer('must be integer'),
  email: yup.string().required(FIELD_IS_REQUIRED_MESSAGE).email(),
  password: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED_MESSAGE)
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
    .oneOf([yup.ref('password')], 'must be the same as password')
    .required(FIELD_IS_REQUIRED_MESSAGE),
  gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(FIELD_IS_REQUIRED_MESSAGE),
  doesAcceptTC: yup.bool().required(FIELD_IS_REQUIRED_MESSAGE).oneOf([true], 'Must accept T&C'),
  picture: yup
    .mixed<FileList>()
    .required(FIELD_IS_REQUIRED_MESSAGE)
    .test('fileSize', 'file size must be smaller than 5MiB', (value) => {
      const file = (value as FileList)[0] as File | undefined;
      const maxSize = 5 * 1024 * 1024;
      if (file) {
        return file.size < maxSize;
      }
    })
    .test('fileExtension', 'file extension must be jpeg or png', (value) => {
      const file = (value as FileList)[0] as File | undefined;
      if (file) {
        return ['image/jpeg', 'image/png'].includes(file.type);
      }
    }),
  country: yup
    .string()
    .oneOf(store.getState().sharedSlice.countries)
    .required(FIELD_IS_REQUIRED_MESSAGE),
});
