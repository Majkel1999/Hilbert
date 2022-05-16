/* eslint-disable no-unused-vars */
import './UserData.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, deleteUser } from '../../store/user/user-actions';

export default function UserData() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <div className="userInfoWrapper">
      <div className="header"> </div>
    </div>
  );
}
