import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { formHookSlice } from '@/redux/features/hook/hookSlice';
import { formUncontrolledSlice } from '@/redux/features/uncontrolled/uncontrolledSlice';

const FORM_UPDATE_INDICATION_TIME = 3000;

const App = () => {
  const uncontrolledFormState = useAppSelector((state) => state.formUncontrolledState);
  const controlledFormState = useAppSelector((state) => state.formHookedState);
  const isControlledFormUpdated = useAppSelector((state) => state.formHookedState.isUpdated);
  const isUncontrolledFormUpdated = useAppSelector(
    (state) => state.formUncontrolledState.isUpdated,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeoutHandle: ReturnType<typeof setTimeout>;
    if (isControlledFormUpdated) {
      const updateFormChangedState = () => {
        dispatch(formHookSlice.actions.changeIsUpdated(false));
      };
      timeoutHandle = setTimeout(updateFormChangedState, FORM_UPDATE_INDICATION_TIME);
    }
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [isControlledFormUpdated]);

  useEffect(() => {
    let timeoutHandle: ReturnType<typeof setTimeout>;
    if (isUncontrolledFormUpdated) {
      const updateFormChangedState = () => {
        dispatch(formUncontrolledSlice.actions.changeIsUpdated(false));
      };
      timeoutHandle = setTimeout(updateFormChangedState, FORM_UPDATE_INDICATION_TIME);
    }
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [isUncontrolledFormUpdated]);

  console.log(uncontrolledFormState);

  return (
    <>
      <h1>From this page you can go to...</h1>
      <nav className="nav">
        <ul className="nav__cards">
          <li className="nav__card">
            <Link to={`/form1`}>Uncontrolled Components Form</Link>
          </li>
          <li className="nav__card">
            <Link to={`/form2`}>Controlled Components Form</Link>
          </li>
        </ul>
      </nav>

      <div className="data__wrapper">
        <div className={`data__card ${isUncontrolledFormUpdated ? 'data__card-updated' : ''}`}>
          <div>
            <b>Name:</b> {uncontrolledFormState.name}
          </div>
          <div>
            <b>Age:</b> {uncontrolledFormState.age ? uncontrolledFormState.age : null}
          </div>
          <div>
            <b>Email:</b> {uncontrolledFormState.email}
          </div>
          <div>
            <b>Password:</b> {uncontrolledFormState.password}
          </div>
          <div>
            <b>Gender:</b> {uncontrolledFormState.gender}
          </div>
          <div>
            <b>Accept T&C:</b> {String(uncontrolledFormState.doesAcceptTC)}
          </div>
          <div>
            <b>Country:</b> {uncontrolledFormState.country}
          </div>
          <img src={uncontrolledFormState.picture} />
        </div>

        <div className={`data__card ${isControlledFormUpdated ? 'data__card-updated' : ''}`}>
          <div>
            <b>Name:</b> {controlledFormState.name}
          </div>
          <div>
            <b>Age:</b> {uncontrolledFormState.age ? uncontrolledFormState.age : null}
          </div>
          <div>
            <b>Email:</b> {controlledFormState.email}
          </div>
          <div>
            <b>Password:</b> {controlledFormState.password}
          </div>
          <div>
            <b>Gender:</b> {controlledFormState.gender}
          </div>
          <div>
            <b>Accept T&C:</b> {String(controlledFormState.doesAcceptTC)}
          </div>
          <div>
            <b>Country:</b> {controlledFormState.country}
          </div>
          <img src={controlledFormState.picture} />
        </div>
      </div>
    </>
  );
};

export default App;
