"use client";

// import { BiSearch } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import BigSpinner from "@/components/common/loader/BigSpinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderView from "./orderView/OrderView";
import OrderDelete from "./OrderDelete";
import {
  useOrderStatusUpdateMutation,
  useOrderTypeUpdateMutation,
} from "@/redux/feature/order/orderApi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allResetProducts, setAllResetProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalData, setTotalData] = useState(0);
  const [oneStartDate, setOneStartDate] = useState(new Date());

  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: allProductsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `${BASE_URL}/order?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setProducts(data?.data);
      setAllProducts(data?.data);
      setAllResetProducts(data?.data);
      setTotalData(data?.totalData);
      return data?.data;
    },
  });

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const formattedDateRange = `${selectionRange?.startDate?.toLocaleDateString() ?? ""
    } - ${selectionRange?.endDate?.toLocaleDateString() ?? ""}`;

  // if select multi date then filter order
  const handleSelect = (date) => {
    const startdate = new Date(date.selection.startDate);
    const enddate = new Date(date.selection.endDate);

    const start_date = startdate.toISOString();
    const end_date = enddate.toISOString();

    let filtered = allProducts?.filter((product) => {
      let productDate = product.createdAt;
      return productDate >= start_date && productDate <= end_date;
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
  };

  // if select one date then filter order
  const handleOneDateSelect = (date) => {
    setOneStartDate(date);
    const selectDate = date.toISOString().split("T")[0]; // Extracts date part in 'YYYY-MM-DD' format

    let filtered = allProducts?.filter((product) => {
      let productDatePart = product.createdAt.split("T")[0];
      return productDatePart === selectDate;
    });
    setProducts(filtered);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
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

  // open view modal
  const handleView = (data) => {
    setIsViewData(data);
    setIsViewOpen(true);
  };

  // open delete modal
  const handleDelete = (data) => {
    setIsDeleteData(data);
    setIsDeleteOpen(true);
  };

  const [updateOrderStatus] = useOrderStatusUpdateMutation(); //Update Order Status
  const [updateOrderType] = useOrderTypeUpdateMutation(); //Update Order Status

  const handleOrderStatus = (status, _id) => {
    const sendData = {
      order_status: status,
      _id,
    };
    updateOrderStatus(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order status update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  const handleOrderType = (type, _id) => {
    const sendData = {
      order_type: type,
      _id,
    };
    updateOrderType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order type update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {/* Date and search field */}
      <div className="flex items-center justify-between gap-1 mt-2">
        <div className="flex items-center gap-4">
          <div ref={calendarRef}>
            <input
              type="text"
              value={formattedDateRange}
              className="border p-2 rounded-md"
              onClick={toggleCalendar}
            />
            {calendarVisible && (
              <div style={{ position: "absolute", zIndex: 1 }}>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              </div>
            )}
          </div>
          <DatePicker
            selected={oneStartDate}
            className="border p-2 rounded-md"
            onChange={(date) => handleOneDateSelect(date)}
          />
          <button
            onClick={() => setProducts(allResetProducts)}
            type="button"
            className="btn bg-secondary text-white py-2 px-4 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2 mt-[16px]">
            <BiSearch className="text-[#717171]" size={20} />
            <input
              onKeyDown={(e) => handleSearch(e)}
              type="text"
              placeholder="Search..."
              className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
            />
          </div>
        </div>
      </div>

      {/* Table for showing data */}
      {
        // orders?.data?.length > 0 ?
        products?.length > 0 ? (
          <div className="mt-5 overflow-x-auto rounded bg-white">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Order ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Phone
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Time
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Transaction Id
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Order Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment Type
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment Method
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Total Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Delivery Method
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products?.map((order) => (
                  <tr key={order?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.order_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.customer_phone}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {formatDate(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.transaction_id || "N/A"}
                    </td>

                    {order?.delivery_method == "courier" ? (
                      <td
                        className={`whitespace-nowrap py-2 font-semibold capitalize`}
                      >
                        {/* {order?.order_status} */}
                        <select
                          onChange={(e) =>
                            handleOrderStatus(e.target.value, order?._id)
                          }
                          id="order_status"
                          className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        >
                          <option selected value={order?.order_status}>
                            {order?.order_status}
                          </option>
                          {order?.order_status !== "pending" && (
                            <option value="pending">Pending</option>
                          )}
                          {order?.order_status !== "confirm" && (
                            <option value="confirm">Confirm</option>
                          )}
                          {order?.order_status !== "processing" && (
                            <option value="processing">Processing</option>
                          )}
                          {order?.order_status !== "pickup" && (
                            <option value="pickup">Pickup</option>
                          )}
                          {order?.order_status !== "shipped" && (
                            <option value="shipped">Shipped</option>
                          )}
                          {order?.order_status !== "delivered" && (
                            <option value="delivered">Delivered</option>
                          )}
                        </select>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-4 py-2 font-semibold text-center">
                        N/A
                      </td>
                    )}

                    <td
                      className={`whitespace-nowrap px-4 py-2 font-semibold capitalize text-center`}
                    >
                      {order?.payment_type}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 font-semibold capitalize text-center`}
                    >
                      {order?.payment_method}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 font-semibold capitalize text-center`}
                    >
                      {order?.payment_status}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 font-semibold capitalize text-center`}
                    >
                      {order?.total_price}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 font-semibold capitalize text-center`}
                    >
                      {order?.delivery_method}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 flex items-center justify-center gap-4">
                      <IoEyeOutline
                        onClick={() => handleView(order)}
                        className="cursor-pointer text-gray-500 hover:text-gray-300"
                        size={25}
                      />
                      <select
                        onChange={(e) =>
                          handleOrderType(e.target.value, order?._id)
                        }
                        id="order_type"
                        className="px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                      >
                        <option selected value={order?.order_type}>
                          {order?.order_type}
                        </option>
                        {order?.order_type !== "pending" && (
                          <option value="pending">Pending</option>
                        )}
                        {order?.order_type !== "success" && (
                          <option value="success">Success</option>
                        )}
                        {order?.order_type !== "cancel" && (
                          <option value="cancel">Cancel</option>
                        )}
                      </select>
                      <MdDeleteForever
                        onClick={() => handleDelete(order)}
                        className="cursor-pointer text-red-500 hover:text-red-300"
                        size={25}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataFound />
        )
      }

      <hr />

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={totalData}
      />

      {/* Handle open view modal */}
      {isViewOpen && (
        <OrderView setIsViewOpen={setIsViewOpen} isViewData={isViewData} />
      )}

      {/* Handle open Complete modal */}
      {/* {isCompleteOpen && (
        <OrderCompleteModal
          setIsCompleteOpen={setIsCompleteOpen}
          isCompleteData={isCompleteData}
          refetch={refetch}
        />
      )} */}

      {/* Handle open delete modal */}
      {isDeleteOpen && (
        <OrderDelete
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteData={isDeleteData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OrderTable;
