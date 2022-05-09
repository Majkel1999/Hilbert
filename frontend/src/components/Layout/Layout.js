import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { snackBarActions } from '../../store/snackBar/snackBar-slice';
import Header from '../UI/Header/Header';
import SnackBar from '../UI/SnackBar/SnackBar';
import './Layout.scss';

const Layout = () => {
  const dispatch = useDispatch();
  const snackBarData = useSelector((state) => state.snackBar);

  useEffect(() => {
    if (snackBarData.show)
      setTimeout(() => dispatch(snackBarActions.resetSnackBarData()), 3000);
  }, [snackBarData.show]);

  return (
    <>
      <Header />
      <SnackBar
        message={snackBarData.message}
        type={snackBarData.type}
        show={snackBarData.show}
      />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
