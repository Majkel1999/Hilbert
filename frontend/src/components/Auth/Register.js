import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth/auth-actions';
import GenericForm from '../GenericForm/GenericForm';
import * as routes from '../../constants/routes';
import './Register.scss';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const inputArray = [
    {
      label: 'username',
      inputType: 'text',
      setValue: setUsername,
      inputValue: username,
    },
    {
      label: 'password',
      inputType: 'password',
      setValue: setPassword,
      inputValue: password,
    },
  ];

  const registerHandler = (e) => {
    e.preventDefault();
    const registerFormData = new FormData();
    registerFormData.set('username', username);
    registerFormData.set('password', password);
    const responsePromise = dispatch(register(registerFormData));
    responsePromise.then((response) => {
      if (response.status === 200) navigate(routes.LOGIN, { replace: true });
    });
  };

  return (
    <div className="registerFormContainer">
      <GenericForm
        header="Register"
        onSubmitHandler={registerHandler}
        formInputArray={inputArray}
        buttonText="Register"
        redirectComponent={
          <Link to={routes.LOGIN} className="haveAccount">
            I have an account
          </Link>
        }
      />
    </div>
  );
}
