import { Link } from 'react-router-dom';
import './App.css';
import { useAppSelector } from '@/redux/hooks';

const App = () => {
  const uncontrolledFormState = useAppSelector((state) => state.formUncontrolledState);
  return (
    <>
      <h1>From this page you can go to</h1>
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
        <div className="data__card">
          Info1
          <div>{uncontrolledFormState.name}</div>
          <img src={uncontrolledFormState.picture} />
        </div>
        <div className="data__card">Info2</div>
      </div>
    </>
  );
};

export default App;
