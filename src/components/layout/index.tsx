import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <section className=" max-w-screen-2xl mx-auto  h-full ">
      <Outlet />
    </section>
  );
}
