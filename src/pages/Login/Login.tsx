/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async (e: any) => {
        const toastId = toast.loading("Logging in");
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = { email, password };

        const res = await login(userInfo).unwrap();

        //verifying user token
        const user = verifyToken(res.data.accessToken) as TUser;
        toast.success("Logged in", { id: toastId, duration: 2000 });

        // sending to redux state
        dispatch(setUser({ user, token: res.data.accessToken }));
        navigate(`/`);
    };
    return (
        <section className="flex items-center h-screen">
            <div className="w-3/12 mx-auto border p-5 rounded-md shadow-md">
                <h1 className="text-center text-2xl pb-4 text-gray-500">
                    Please Login
                </h1>
                <form onSubmit={handleLogin}>
                    {/* TODO: remove default value */}
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="text"
                        name="email"
                        placeholder="Email"
                        defaultValue="user@gmail.com"
                    />
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="password"
                        name="password"
                        placeholder="Password"
                        defaultValue="123456"
                    />
                    <div className="text-center">
                        <input
                            className="bg-red-300 p-2 px-6 rounded-md hover:bg-red-400 duration-200 text-white font-semibold cursor-pointer"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
                <p className="text-center pt-5 text-xs">
                    New User?{" "}
                    <Link className="text-blue-500" to={"/register"}>
                        Please Register
                    </Link>{" "}
                </p>
            </div>
        </section>
    );
};

export default Login;
