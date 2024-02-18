/* eslint-disable no-unsafe-optional-chaining */
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { useUpdateAproductMutation } from "../../../redux/features/product/productApi";
import Loading from "../../../components/ui/Loading";

const EditProducts = () => {
    const loaderData = useLoaderData() || { data: {} };
    const [updateAproduct, { isLoading }] = useUpdateAproductMutation();
    if (isLoading) {
        return <Loading />;
    }
    const {
        _id,
        productName,
        productPrice,
        productQty,
        releaseDate,
        brand,
        model,
        type,
        size,
        color,
        suspension,
    } = loaderData?.data;

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const productPrice = parseInt(form.productPrice.value);
        const productQty = parseInt(form.productQty.value);
        const releaseDate = form.releaseDate.value;
        const brand = form.brand.value;
        const model = form.model.value;
        const type = form.type.value;
        const size = form.size.value;
        const color = form.color.value;
        const suspension = form.suspension.value;

        const updatedDoc = {
            productName,
            productPrice,
            productQty,
            releaseDate,
            brand,
            model,
            type,
            size,
            color,
            suspension,
        };

        const editThing = { _id, updatedDoc };

        // TODO: handle error and success properly
        const res = await updateAproduct(editThing);
        toast.success(res?.data?.message);
        form.reset();
    };

    return (
        <div>
            <h1 className="py-2 text-2xl pb-5">Edit Products</h1>
            <form
                onSubmit={handleUpdateProduct}
                className="w-2/4 mx-auto space-y-1"
            >
                <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    className="input input-bordered w-full"
                    defaultValue={productName}
                />
                <input
                    type="text"
                    placeholder="Price"
                    name="productPrice"
                    className="input input-bordered w-full"
                    defaultValue={productPrice}
                />
                <input
                    type="number"
                    placeholder="Initial Quantity"
                    name="productQty"
                    className="input input-bordered w-full"
                    defaultValue={productQty}
                />
                <input
                    type="date"
                    name="releaseDate"
                    className="input input-bordered w-full"
                    defaultValue={releaseDate}
                />
                <input
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    className="input input-bordered w-full"
                    defaultValue={brand}
                />
                <input
                    type="text"
                    placeholder="Model"
                    name="model"
                    className="input input-bordered w-full"
                    defaultValue={model}
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    className="input input-bordered w-full"
                    defaultValue={type}
                />
                <input
                    type="text"
                    placeholder="Size"
                    name="size"
                    className="input input-bordered w-full"
                    defaultValue={size}
                />
                <input
                    type="text"
                    placeholder="Color"
                    name="color"
                    className="input input-bordered w-full"
                    defaultValue={color}
                />
                <input
                    type="text"
                    placeholder="Suspension"
                    name="suspension"
                    className="input input-bordered w-full"
                    defaultValue={suspension}
                />
                <div className="text-center">
                    <input
                        type="submit"
                        value="Save"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProducts;
