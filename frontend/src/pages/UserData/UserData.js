/* eslint-disable no-unused-vars */
import './UserData.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, deleteUser } from '../../store/user/user-actions';
import Button from '../../components/UI/Button/Button';

export default function UserData() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

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
          <spam>{userData.username || 'Unknown'}</spam>
        </div>
        <div className="userDataItem">
          <label>Full name:</label>
          <spam>{userData.fullName || 'Unknown'}</spam>
        </div>
        <div className="userDataItem">
          <label>Email:</label>
          <spam>{userData.email || 'Unknown'}</spam>
        </div>
      </div>
      <Button text="Delete user" onClickHandler={deleteUser} />
    </div>
  );
}
