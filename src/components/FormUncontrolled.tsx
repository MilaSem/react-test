import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState, useRef, useEffect } from 'react';
import { formSchema } from './validation';
import { FormState } from '@/redux/features/common';
import { ValidationError } from 'yup';
import { formUncontrolledSlice } from '@/redux/features/uncontrolled/uncontrolledSlice';
import { getBase64FileRepresentation } from '@/util/file';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface FormErrorState {
  [key: string]: string[];
  name: string[];
  age: string[];
  email: string[];
  password: string[];
  passwordConfirmation: string[];
  gender: string[];
  doesAcceptTC: string[];
  picture: string[];
  country: string[];
}

const initialFormErrorState: FormErrorState = {
  name: [],
  age: [],
  email: [],
  password: [],
  passwordConfirmation: [],
  gender: [],
  doesAcceptTC: [],
  picture: [],
  country: [],
};

const FormUncontrolled = () => {
  const countries = useAppSelector((state) => state.sharedSlice.countries);
  const uncontrolledFormState = useAppSelector((state) => state.formUncontrolledState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formErrorState, setFormErrorState] = useState<FormErrorState>(initialFormErrorState);

  useEffect(() => {
    const handleFormSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formElements = [...form.elements];
      const formValues = formElements.reduce(
        (acc, cur) => {
          const inputName = cur.getAttribute('name');
          const current = cur as HTMLInputElement;
          if (inputName && current.type === 'checkbox') {
            acc[inputName] = current.checked;
          } else if (inputName && !['radio'].includes(current.type)) {
            acc[inputName] = current.value;
          }
          return acc;
        },
        {} as Record<string, string | number | boolean | File>,
      );
      const gender = formElements.find(
        (item) =>
          (item as HTMLInputElement).name === 'gender' && (item as HTMLInputElement).checked,
      ) as HTMLInputElement;
      formValues['gender'] = gender.value;
      const picture = formElements.find(
        (item) => (item as HTMLInputElement).name === 'picture',
      ) as HTMLInputElement;
      formValues['picture'] = picture.files?.[0] as File;

      try {
        const validated = (await formSchema.validate(formValues, {
          abortEarly: false,
        })) as FormState;
        setFormErrorState(initialFormErrorState);
        const pictureBase64 = await getBase64FileRepresentation(formValues['picture']);
        const newFormState = { ...validated, picture: pictureBase64 };
        console.log('newformstate', newFormState);
        dispatch(formUncontrolledSlice.actions.changeState(newFormState));
        navigate('/');
      } catch (e) {
        if (e instanceof ValidationError) {
          const errors = e.inner;
          const errorState = errors.reduce((acc, cur) => {
            const fieldName = String(cur.path);
            return {
              ...acc,
              [fieldName]: [...(acc[fieldName] || []), cur.message],
            };
          }, {} as Partial<FormErrorState>) as FormErrorState;
          setFormErrorState({ ...initialFormErrorState, ...errorState });
        } else {
          throw e;
        }
      }
    };

    if (formRef.current) {
      formRef.current.addEventListener('submit', handleFormSubmit);
    }
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  return (
    <>
      <h1>Uncontrolled Components Form</h1>
      <div className="link__wrapper">
        <Link to={'/'}>to main</Link>
      </div>
      <div>
        <form ref={formRef} id="form" className="form">
          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.name}
              className="input__text"
              name="name"
              id="name"
              placeholder="Name"
              type="text"
            />
            {formErrorState.name && <div>{formErrorState.name.join(',')}</div>}
          </div>

          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.age}
              className="input__text"
              name="age"
              id="age"
              placeholder="Age"
              type="text"
            />
            {formErrorState.age && <div>{formErrorState.age.join(',')}</div>}
          </div>

          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.email}
              className="input__text"
              name="email"
              id="email"
              placeholder="Email"
              type="email"
            />
            {formErrorState.email && <div>{formErrorState.email.join(',')}</div>}
          </div>

          <div className="form__item">
            <input
              className="input__text"
              defaultValue={uncontrolledFormState.password}
              name="password"
              id="password"
              placeholder="Password1"
              type="text"
            />
            {formErrorState.password && <div>{formErrorState.password.join(',')}</div>}
          </div>

          <div className="form__item">
            <input
              className="input__text"
              name="passwordConfirmation"
              id="passwordConfirmati"
              placeholder="Password2"
              type="text"
            />
            {formErrorState.passwordConfirmation && (
              <div>{formErrorState.passwordConfirmation.join(',')}</div>
            )}
          </div>

          <div className="gender__wrapper">
            <fieldset>
              <div className="gender__item">
                <label htmlFor="male">male</label>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  defaultChecked={uncontrolledFormState.gender === 'Male'}
                />
              </div>

              <div className="gender__item">
                <label htmlFor="female">female</label>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  defaultChecked={uncontrolledFormState.gender === 'Female'}
                />
              </div>
            </fieldset>
          </div>

          <div className="form__item">
            <div className="accept__wrapper">
              <label htmlFor="accept" className="accept__label">
                Accept T&C
              </label>
              <input
                id="accept"
                type="checkbox"
                name="accept"
                defaultChecked={uncontrolledFormState.doesAcceptTC}
              />
            </div>
          </div>

          <div className="form__item">
            <input name="picture" id="picture" type="file" className="input__picture" />
            {formErrorState.picture && <div>{formErrorState.picture.join(',')}</div>}
          </div>

          <div className="form__item">
            <label htmlFor="country" className="country__label">
              Country
            </label>
            <select
              name="country"
              id="country"
              defaultValue={uncontrolledFormState.country}
              className="dropdown"
            >
              {countries.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="button__wrapper">
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { FormUncontrolled };
