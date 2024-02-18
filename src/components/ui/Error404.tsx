import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <h1 className="text-5xl">Error 404</h1>
            <Link to={"/"} className="px-5 bg-red-400">
                Go Home
            </Link>
        </div>
    );
};

export default Error404;
