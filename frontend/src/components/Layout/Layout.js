import { Outlet } from 'react-router-dom';
import Header from '../UI/Header/Header';
import './Layout.scss';

const Layout = () => (
  <>
    <Header />
    <main className="App">
      <Outlet />
    </main>
  </>
);

export default Layout;
