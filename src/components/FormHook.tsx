import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { formSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getBase64FileRepresentation } from '@/util/file';
import { FormState } from '@/redux/features/common';
import { formHookSlice } from '@/redux/features/hook/hookSlice';

const FormHook = () => {
  const uncontrolledFormState = useAppSelector((state) => state.formUncontrolledState);
  const countries = useAppSelector((state) => state.sharedSlice.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<yup.InferType<typeof formSchema>>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<yup.InferType<typeof formSchema>> = async (data) => {
    console.log('data', data);
    const pictureBase64 = await getBase64FileRepresentation(data.picture[0]);
    const newFormState = { ...data, picture: pictureBase64 };
    console.log('newformstate', newFormState);
    dispatch(formHookSlice.actions.changeState(newFormState as FormState));
    dispatch(formHookSlice.actions.changeIsUpdated(true));
    navigate('/');
  };

  console.log('errors', errors);

  return (
    <>
      <h1>Controlled Components Form</h1>
      <div className="link__wrapper">
        <Link to={'/'}>to main</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} id="form" className="form">
          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.name}
              className="input__text"
              {...register('name')}
              id="name"
              placeholder="Name"
            />
            {errors.name && <div>{errors.name.message}</div>}
          </div>

          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.age || ''}
              {...register('age')}
              className="input__text"
              id="age"
              placeholder="Age"
            />
            {errors.age && <div>{errors.age.message}</div>}
          </div>

          <div className="form__item">
            <input
              defaultValue={uncontrolledFormState.email}
              {...register('email')}
              className="input__text"
              id="email"
              placeholder="Email"
            />
            {errors.email && <div>{errors.email.message}</div>}
          </div>

          <div className="form__item">
            <input
              className="input__text"
              defaultValue={uncontrolledFormState.password}
              {...register('password')}
              id="password"
              placeholder="Password1"
            />
            {errors.password && <div>{errors.password.message}</div>}
          </div>

          <div className="form__item">
            <input
              className="input__text"
              {...register('passwordConfirmation')}
              id="passwordConfirmati"
              placeholder="Password2"
            />
            {errors.passwordConfirmation && <div>{errors.passwordConfirmation.message}</div>}
          </div>

          <div className="gender__wrapper">
            <fieldset>
              <div className="gender__item">
                <label htmlFor="male">male</label>
                <input
                  id="male"
                  {...register('gender')}
                  type="radio"
                  value="Male"
                  defaultChecked={uncontrolledFormState.gender === 'Male'}
                />
              </div>

              <div className="gender__item">
                <label htmlFor="female">female</label>
                <input
                  id="female"
                  {...register('gender')}
                  type="radio"
                  value="Female"
                  defaultChecked={uncontrolledFormState.gender === 'Female'}
                />
              </div>
            </fieldset>
          </div>

          <div className="form__item">
            <label htmlFor="accept" className="accept__label">
              Accept T&C
            </label>
            <input
              id="accept"
              {...register('doesAcceptTC')}
              type="checkbox"
              defaultChecked={uncontrolledFormState.doesAcceptTC}
            />
            {errors.doesAcceptTC && <div>{errors.doesAcceptTC.message}</div>}
          </div>

          <div className="form__item">
            <input {...register('picture')} id="picture" type="file" className="input__picture" />
            {errors.picture && <div>{errors.picture.message}</div>}
          </div>

          <div className="form__item">
            <label htmlFor="country" className="country__label">
              Country
            </label>
            <select
              {...register('country')}
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

export { FormHook };
