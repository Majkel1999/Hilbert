import { Outlet } from 'react-router-dom';
import Header from '../UI/Header/Header';
import SnackBar from '../UI/SnackBar/SnackBar';
import './Layout.scss';

const Layout = () => (
  <>
    <Header />
    <SnackBar message="example" type="success" />
    <main className="App">
      <Outlet />
    </main>
  </>
);

export default Layout;
