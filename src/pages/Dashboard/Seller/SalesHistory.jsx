import Loading from "../../../components/ui/Loading";
import { useSalesRecordQuery } from "../../../redux/features/sales/salesApi";

const SalesHistory = () => {
    const { data: sRecord, isLoading } = useSalesRecordQuery(undefined);
    if (isLoading) {
        return <Loading />;
    }
    const salesRecord = sRecord?.data;

    return (
        <div>
            {/* Sale Filtering */}
            <div className="py-4">
                <label htmlFor="filterQuery">Filter : </label>
                <select name="filterQuery">
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Buyer Name</th>
                            <th>Sold Item</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesRecord?.map((saleRec, index) => (
                            <tr key={saleRec?._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{saleRec?.buyerName}</td>
                                <td>{saleRec?.quantity}</td>
                                <td>$ {saleRec?.product?.productPrice}</td>
                                <td>
                                    {new Date(
                                        saleRec?.createdAt
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesHistory;
