import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const sidebarItems = [
    {
        path: "/add-product",
        title: "Add Product",
    },
    {
        path: "/manage-product",
        title: "Manage Product",
    },
    {
        path: "/sales-history",
        title: "Sales History",
    },
];

const Sidebar = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <aside className="h-screen bg-red-200 p-5 w-80">
            <div className="flex flex-col">
                {sidebarItems?.map(({ title, path }) => (
                    <Link
                        key={path}
                        to={path}
                        className="bg-red-300 px-5 py-1 font-semibold text-gray-700 rounded-md my-1 hover:bg-red-400 duration-200 active:text-white"
                    >
                        {title}
                    </Link>
                ))}
                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-5 py-1 font-semibold text-white rounded-md my-1 hover:bg-red-700 duration-200 active:text-red-200"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
