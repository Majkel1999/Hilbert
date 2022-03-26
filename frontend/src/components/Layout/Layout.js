import { Outlet } from 'react-router-dom';
import './Layout.scss';

const Layout = () => (
  <main className="App">
    <Outlet />
  </main>
);

export default Layout;
