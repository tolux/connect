import { Outlet } from 'react-router';
import ChartSection from '../chartSection';

export function PageLayout() {
  return (
    <section className=" max-w-screen-2xl mx-auto  h-full ">
      <ChartSection />
      <Outlet />
    </section>
  );
}
