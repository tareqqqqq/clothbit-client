import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Top Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-1">

        {/* Sidebar (Left) */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Right Dashboard Content */}
        <div className="flex-1 p-5 mt-10 md:ml-64">
          <Outlet />
        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default DashboardLayout;
