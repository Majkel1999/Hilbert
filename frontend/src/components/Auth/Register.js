import { useState } from 'react';
import axios from '../../api/axios';
import GenericForm from '../GenericForm/GenericForm';

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
    registerFormData.append('username', username);
    registerFormData.append('password', password);
    try {
      const response = await axios.post(REGISTER_URL, registerFormData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericForm
      header="Register"
      onSubmitHandler={register}
      formInputArray={inputArray}
      buttonText="Register"
    />
  );
}
