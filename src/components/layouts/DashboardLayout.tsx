import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

const DashboardLayout = () => {
    return (
        <section>
            <div className="p-3 text-center bg-red-300 shadow-md">
                <h1 className="text-2xl font-semibold text-gray-700 ">
                    Bike Management System
                </h1>
            </div>
            <div className="flex gap-4 bg-slate-200">
                <Sidebar />
                <Outlet />
            </div>
        </section>
    );
};

export default DashboardLayout;
