import { Outlet } from "react-router-dom";
import SidebarNav from "../Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <SidebarNav />
      <section className="h-full w-full">
        <Header />
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
