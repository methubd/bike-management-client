/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    // Sending token with each request
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", token);
        }
        return headers;
    },
});

//using a custom baseQuery coz of retrive a access token using refresh token
// const baseQuerywithRefreshToken: BaseQueryFn<
//     FetchArgs,
//     BaseQueryApi,
//     DefinitionType
// > = async (args, api, extraOptions): Promise<any> => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error?.status === 401) {
//         //Send refresh token
//         console.log("sending refresh token", result.error?.status);

//         const res = await fetch(
//             "https://trmethu.xyz/server/v2/api/v1/auth/refresh-token",
//             {
//                 method: "POST",
//                 credentials: "include",
//             }
//         );

//         // data / refresh token
//         const data = await res.json();

//         // if accessToken not found that's mean refreshToken not valid (modified)
//         if (data?.data?.accessToken) {
//             const user = (api.getState() as RootState).auth.user;
//             api.dispatch(setUser({ user, token: data.data.accessToken }));
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }
//     return result;
// };

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ["allProducts"],
});
