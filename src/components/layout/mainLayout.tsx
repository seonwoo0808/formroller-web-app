
import { Outlet } from 'react-router-dom';
import Dock from '@/components/ui/dock';

function MainLayout() {
  return (
    <>
      {/* <Header isMain={true}></Header> */}
      <Outlet />
      <Dock />
    </>
  );
}

export default MainLayout;
