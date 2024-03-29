"use client";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { useSelector } from "react-redux";

const PcBuilderInvoice = () => {
  const products = useSelector((state) => state.pcbuild.products);
  const formatDate = () => {
    const date = new Date();
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  // Calculate total price for each product
  const calculateTotalPrice = (quantity, product_price) =>
    quantity * product_price;

  // Calculate overall total price for all products
  const calculateOverallTotal = () => {
    return products.reduce((total, product) => {
      const productTotal = calculateTotalPrice(
        product.quantity,
        product.product_price
      );
      return total + productTotal;
    }, 0);
  };

  return (
    <div className="w-[842px] h-[595px] mx-auto border rounded px-2">
      <h2 className="text-center mb-5 font-bold">Janani Computers</h2>
      <address className="text-center text-wrap">
        Janani Computers Limited Kusholi Bhaban, 238/1 Begum Rokeya Sarani,
        Taltola, Dhaka-1207, Bangladesh,
      </address>
      <p className="text-center">
        +8801796682951, +8801796682951, info@janani.com
      </p>
      <div className="mt-5 overflow-x-auto rounded bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-left">
                #SL
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-left">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-left">
                Product
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold">QTY</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-right">
                Unit Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-right">
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products?.map((product, i) => (
              <tr
                key={product?._id}
                className={`${
                  i % 2 === 0 ? "bg-[#F5F7F8]" : "bg-white"
                } border-b`}
              >
                <td className="whitespace-nowrap pl-6 py-2 ">{i + 1}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {product?.pc_builder_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 w-[250px] text-wrap inline-block">
                  {product?.product_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-center">
                  {product?.quantity}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right">
                  {numberWithCommas(product?.product_price)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right">
                  {numberWithCommas(product?.quantity * product?.product_price)}
                </td>
              </tr>
            ))}
            <tr className="border-b py-5">
              <td className="whitespace-nowrap px-4 py-3"></td>
              <td className="whitespace-nowrap pl-6 py-3"></td>
              <td className="whitespace-nowrap px-4 py-3 w-[250px] text-wrap inline-block"></td>
              <td className="whitespace-nowrap px-4 py-3 text-center"></td>
              <td className="whitespace-nowrap px-4 py-3 text-right">Total</td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                {numberWithCommas(calculateOverallTotal())}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-5">
        All information generated from{" "}
        <span className="text-blue-500 underline">jananicomputer.com</span> at{" "}
        {formatDate()}
      </p>
    </div>
  );
};

export default PcBuilderInvoice;
