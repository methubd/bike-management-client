import { baseApi } from "../../api/baseApi";

const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/users/create-customer",
                method: "POST",
                body: userInfo,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApi;
