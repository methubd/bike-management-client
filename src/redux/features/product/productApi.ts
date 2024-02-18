import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            providesTags: ["allProducts"],
        }),
        deleteAproduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "DELETE",
            }),
        }),
        addProduct: builder.mutation({
            query: (productInfo) => {
                console.log(productInfo);

                return {
                    url: "/products/create-product",
                    method: "POST",
                    body: productInfo,
                };
            },
            invalidatesTags: ["allProducts"],
        }),
        saleAproduct: builder.mutation({
            query: (invoiceInfo) => ({
                url: "/sale",
                method: "POST",
                body: invoiceInfo,
            }),
            invalidatesTags: ["allProducts"],
        }),
        updateAproduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId._id}`,
                method: "PUT",
                body: productId.updatedDoc,
            }),
            invalidatesTags: ["allProducts"],
        }),
        deleteBulkProduct: builder.mutation({
            query: (ids) => ({
                url: `/products`,
                method: "DELETE",
                body: ids,
            }),
            invalidatesTags: ["allProducts"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useDeleteAproductMutation,
    useAddProductMutation,
    useSaleAproductMutation,
    useUpdateAproductMutation,
    useDeleteBulkProductMutation,
} = productApi;
