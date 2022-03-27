import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import GenericForm from '../GenericForm/GenericForm';
import * as routes from '../../constants/routes';

const REGISTER_URL = '/user/register';

export default function Register() {
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
  const register = async (e) => {
    e.preventDefault();
    const registerFormData = new FormData();
    registerFormData.set('username', username);
    registerFormData.set('password', password);
    try {
      const response = await axios.post(REGISTER_URL, registerFormData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registerFormContainer">
      <GenericForm
        header="Register"
        onSubmitHandler={register}
        formInputArray={inputArray}
        buttonText="Register"
        redirectComponent={<Link to={routes.LOGIN}>I have an account</Link>}
      />
    </div>
  );
}
