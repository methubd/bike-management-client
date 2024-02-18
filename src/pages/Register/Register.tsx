/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/register/registerApi";

const Register = () => {
    const [register] = useRegisterMutation();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const gender = form.gender.value;
        const contact = form.contact.value;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = { name, gender, contact, email, password };
        const res = await register(userInfo);
        console.log(res);
    };
    return (
        <section className="flex items-center h-screen">
            <div className="w-3/12 mx-auto border p-5 rounded-md shadow-md">
                <h1 className="text-center text-2xl pb-4 text-gray-500">
                    Please Register
                </h1>
                <form onSubmit={handleRegister}>
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="text"
                        name="name"
                        placeholder="Name"
                    />
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="text"
                        name="gender"
                        placeholder="Gender - Male or Female"
                    />
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="text"
                        name="contact"
                        placeholder="11 digit contact No"
                    />
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="text"
                        name="email"
                        placeholder="Email"
                    />
                    <input
                        className="bg-red-100 rounded-md p-2 px-3 w-full outline-none mb-2"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <div className="text-center">
                        <input
                            className="bg-red-300 p-2 px-6 rounded-md hover:bg-red-400 duration-200 text-white font-semibold cursor-pointer"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>
                <p className="text-center pt-5 text-xs">
                    Old User{" "}
                    <Link className="text-blue-500" to={"/login"}>
                        Please Login
                    </Link>{" "}
                </p>
            </div>
        </section>
    );
};

export default Register;
