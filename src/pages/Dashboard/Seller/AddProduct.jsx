import { toast } from "sonner";
import { useAddProductMutation } from "../../../redux/features/product/productApi";

const AddProduct = () => {
    const [addProduct, { isLoading: isAddProductLoading }] =
        useAddProductMutation();

    const handleAddNewProduct = async (e) => {
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

        const newProduct = {
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

        try {
            const toastId = toast.loading("Adding...");
            const res = await addProduct(newProduct);

            if (res.data.success) {
                form.reset();
                toast.success(res.data.message, {
                    id: toastId,
                    duration: 1000,
                });
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }

        // TODO: handle error and success properly
    };

    return (
        <section>
            <h1 className="py-2 text-2xl pb-5">Add Product</h1>
            <form
                className="w-2/4 mx-auto space-y-1"
                onSubmit={handleAddNewProduct}
            >
                <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Price"
                    name="productPrice"
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    placeholder="Initial Quantity"
                    name="productQty"
                    className="input input-bordered w-full"
                />
                <input
                    type="date"
                    name="releaseDate"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Model"
                    name="model"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Size"
                    name="size"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Color"
                    name="color"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Suspension"
                    name="suspension"
                    className="input input-bordered w-full"
                />
                {isAddProductLoading || (
                    <div className="text-center">
                        <input
                            type="submit"
                            value="Add Product"
                            className="btn btn-primary"
                        />
                    </div>
                )}
            </form>
        </section>
    );
};

export default AddProduct;
