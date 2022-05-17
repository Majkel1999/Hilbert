/* eslint-disable no-unused-vars */
import './UserData.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, deleteUser } from '../../store/user/user-actions';
import * as routes from '../../constants/routes';
import Button from '../../components/UI/Button/Button';

export default function UserData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const removeCurrentUser = () => {
    const responsePromise = dispatch(deleteUser());

    responsePromise.then((response) => {
      if (response.status === 200) navigate(routes.LOGIN, { replace: true });
    });
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <div className="userInfoWrapper">
      <div className="header">
        <h3>User Data</h3>
      </div>
      <div className="userDataContainer">
        <div className="userDataItem">
          <label>Username:</label>
          <span>{userData.username || 'Unknown'}</span>
        </div>
        <div className="userDataItem">
          <label>Full name:</label>
          <span>{userData.fullName || 'Unknown'}</span>
        </div>
        <div className="userDataItem">
          <label>Email:</label>
          <span>{userData.email || 'Unknown'}</span>
        </div>
      </div>
      <Button text="Delete user" onClickHandler={removeCurrentUser} />
    </div>
  );
}
