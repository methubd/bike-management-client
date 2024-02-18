import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        salesRecord: builder.query({
            query: () => ({
                url: "/sale",
                method: "GET",
            }),
        }),
    }),
});

export const { useSalesRecordQuery } = salesApi;
