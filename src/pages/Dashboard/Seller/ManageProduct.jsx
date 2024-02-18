import { Link } from "react-router-dom";
import Loading from "../../../components/ui/Loading";
import {
    useDeleteAproductMutation,
    useDeleteBulkProductMutation,
    useGetAllProductsQuery,
    useSaleAproductMutation,
} from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { useState } from "react";
import { useSalesRecordQuery } from "../../../redux/features/sales/salesApi";

const ManageProduct = () => {
    const [deleteBulkProduct, { isLoading: isBulkDeleteLoading }] =
        useDeleteBulkProductMutation();
    const [bulkIds, setBulkIds] = useState([]);
    const { refetch: refecthSalesRec } = useSalesRecordQuery(undefined);
    const [saleAproduct] = useSaleAproductMutation();
    const [saleBox, setSaleBox] = useState(false);
    const [selectedForSale, setSelectedForSale] = useState("");
    const [deleteMany, setDeleteMany] = useState(false);
    const [deleteAproduct] = useDeleteAproductMutation();

    const {
        data,
        isLoading,
        refetch: refetchProducts,
    } = useGetAllProductsQuery(undefined);

    if (isLoading && isBulkDeleteLoading) {
        return <Loading />;
    }

    const productData = data?.data ?? data;

    const saleProduct = productData?.find(
        (product) => product._id === selectedForSale
    );

    const handleDeleteAproduct = async (productId) => {
        const res = await deleteAproduct(productId);

        const toastId = toast.loading("Deleting");
        toast.loading(res?.error?.data?.message, {
            id: toastId,
        });

        toast.success(res.data.message, {
            id: toastId,
        });

        refetchProducts();
    };

    const handleSaleProduct = (productId) => {
        setSelectedForSale(productId);
        setSaleBox(true);
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        const form = e.target;
        const buyerName = form.customerName.value;
        const quantity = parseInt(form.quantity.value);

        if (quantity > saleProduct?.productQty) {
            toast.error(
                "Error: Quantity should be less than or equal to the available product quantity"
            );
            return;
        }

        const newInvoice = {
            buyerName,
            quantity,
            product: selectedForSale,
        };

        const res = await saleAproduct(newInvoice);
        toast.success(res?.data?.message);
        form.reset();
        setSaleBox(false);
        refetchProducts();
        refecthSalesRec();
    };

    const handleBulkDelete = (id) => {
        setDeleteMany(true);
        const ids = [...bulkIds, id];
        setBulkIds(ids);
    };

    const handleBulkProductDelete = async () => {
        try {
            const toastId = toast.loading("Deleting...");
            const res = await deleteBulkProduct(bulkIds);

            if (res.data.success) {
                toast.success(res.data.message, {
                    id: toastId,
                    duration: 1000,
                });
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
        refetchProducts();
    };

    return (
        <section>
            <h1 className="py-2 text-2xl pb-5">All Bikes</h1>

            {/* Invoicing  */}
            {saleBox && (
                <div className="py-5 border shadow-lg mb-10 rounded-md text-center">
                    <h1 className="text-2xl font-semibold">
                        Add Customer Details
                    </h1>
                    <form onSubmit={handleOrder} className="py-1">
                        <input
                            type="text"
                            placeholder="Customer Name"
                            name="customerName"
                            className="input input-bordered w-full max-w-xs"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            className="input input-bordered w-full max-w-xs"
                        />
                        <input
                            className="btn-primary"
                            type="submit"
                            value="Sale Product"
                        />
                    </form>
                </div>
            )}

            {/* Deleting Many Products Here */}
            <div className="text-right">
                {deleteMany && (
                    <button
                        onClick={handleBulkProductDelete}
                        className="text-red-500 px-2 border border-black rounded-md active:bg-red-700 active:text-white active:border-white duration-200"
                    >
                        Delete Selected
                    </button>
                )}
            </div>

            {/* Filtering Product Data */}
            <div>
                <label htmlFor="price">Filter : </label>
                <select name="price">
                    <option value="price">Price</option>
                </select>
            </div>

            {/* Showing Products Data */}
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>In Stock</th>
                            <th>Color</th>
                            <th>Suspension</th>
                            <th>Actions</th>
                            <th>Select</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productData?.map((product, index) => (
                            <tr key={product._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{product?.productName}</td>
                                <td>$ {product?.productPrice}</td>
                                <td>{product?.brand}</td>
                                <td className="text-center">
                                    {product?.productQty}
                                </td>
                                <td>{product?.color}</td>
                                <td>{product?.suspension}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleSaleProduct(product?._id)
                                        }
                                        className="text-xs px-2 border border-blue-500 py-1 rounded-md text-blue-700 active:text-red-50 active:bg-green-800 duration-150 mr-2"
                                    >
                                        Sale
                                    </button>
                                    <Link
                                        to={`/edit-product/${product?._id}`}
                                        className="text-xs px-2 border py-1 rounded-md text-green-700 active:text-red-50 active:bg-green-800 duration-150 mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteAproduct(product?._id)
                                        }
                                        className="text-xs px-2 bg-red-300 py-1 rounded-md text-red-700 active:text-red-50 active:bg-red-800 duration-150 "
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="text-center">
                                    <input
                                        onChange={() =>
                                            handleBulkDelete(product?._id)
                                        }
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageProduct;
