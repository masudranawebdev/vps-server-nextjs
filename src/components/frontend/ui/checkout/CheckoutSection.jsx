"use client";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import { cities } from "@/data/city-data";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/context";
import { divisions } from "@/data/division-data";
import { districts } from "@/data/district-data";
import { addressData } from "@/data/address-data";
import { isLoggedin } from "@/services/auth.services";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { numberWithCommas } from "@/utils/thousandSeparate";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useOrderMutation } from "@/redux/feature/order/orderApi";
import { allRemoveFromCart } from "@/redux/feature/cart/cartSlice";
import { useCheckCouponMutation } from "@/redux/feature/coupon/couponApi";

const CheckoutSection = () => {
  const [city, setCity] = useState(null);
  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [couponApply, setCouponApply] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [billerName, setBillerName] = useState("");
  const [billerPhone, setBillerPhone] = useState("");
  const [billerAddress, setBillerAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryMethodType, setDeliveryMethodType] = useState("");
  const [deliveryPickupAddress, setDeliveryPickupAddress] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("60");
  const [districtsData, setDistrictsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [agree, setAgree] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const { user, loading } = useContext(AuthContext);
  const [order, { isLoading }] = useOrderMutation();
  const [checkCoupon, { isLoading: couponLoading }] = useCheckCouponMutation();
  const router = useRouter();
  const isLogged = isLoggedin();

  useEffect(() => {
    if (divisionId) {
      const districtData = districts.filter(
        (district) => district?.division_id === divisionId
      );
      setDistrictsData(districtData);
    }
  }, [divisionId]);

  useEffect(() => {
    if (districtId) {
      const citiesData = cities.filter(
        (city) => city?.district_id === districtId
      );
      setCitiesData(citiesData);
    }
  }, [districtId]);

  useEffect(() => {
    setTotalAmount(totalPrice);
  }, [totalPrice]);

  const handleCheckCoupon = async () => {
    try {
      const couponData = {
        coupon_code: couponCode,
        customer_id: user?._id,
      };
      const res = await checkCoupon(couponData);
      if (res?.data?.statusCode === 200 && res.data.success) {
        toast.success("Coupon Apply Successfully!");
        localStorage.setItem("copAp", JSON.stringify(res?.data?.data));
        setCouponApply(res?.data?.data);
        if (res?.data?.data?.coupon_type === "fixed") {
          setTotalAmount(
            (prevTotalPrice) =>
              prevTotalPrice - Number(res?.data?.data?.coupon_amount)
          );
        } else if (res?.data?.data?.coupon_type === "percent") {
          const discountPrice =
            (totalPrice * Number(res?.data?.data?.coupon_amount)) / 100;
          setTotalAmount((prevTotalPrice) => prevTotalPrice - discountPrice);
        }
        setCouponCode("");
      } else if (!res?.error?.data?.success) {
        toast.error(res?.error?.data?.message);
        setTotalAmount(totalPrice);
        setTotal(Number(totalAmount) + Number(deliveryCharge));
        setCouponCode("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTotal(Number(totalAmount) + Number(deliveryCharge));
  }, [totalAmount, deliveryCharge]);

  useEffect(() => {
    const couponApplyDone = JSON.parse(localStorage.getItem("copAp"));
    if (couponApplyDone) {
      setCouponApply(couponApplyDone);
    }
  }, []);

  const handleOrder = async (data) => {
    try {
      setOrderLoading(true);
      data["division"] = division;
      data["district"] = district;
      data["city"] = city;
      data["delivery_method"] = deliveryMethod;
      data["customer_id"] = user?._id;
      data["customer_phone"] = user?.user_phone;
      data["total_price"] = total;

      data["order_products"] = cartProducts?.map((cartProduct) => ({
        product_id: cartProduct?.productId,
        product_name: cartProduct?.product_name,
        product_thumbnail: cartProduct?.product_thumbnail,
        product_quantity: cartProduct?.quantity,
        product_price: cartProduct?.product_price,
      }));

      data["delivery_charge"] = Number(deliveryCharge);
      data["cus_name"] = user?.user_name;
      data["cus_email"] = user?.user_email;

      if (!paymentMethod) {
        return toast.error("Please Select your Payment Method!");
      }

      if (paymentMethod !== null) {
        data["payment_method"] = paymentMethod;
      } else {
        return;
      }

      if (deliveryCharge === "60") {
        data["delivery_time"] = "inside dhaka 5 days";
      } else if (deliveryCharge === "160") {
        data["delivery_time"] = "outside dhaka 7 days";
      }

      if (deliveryMethod === "courier") {
        data["delivery_method_type"] = deliveryMethodType;
        data["delivery_pickup_address"] = deliveryPickupAddress;
      }

      if (isBillingAddress) {
        data["biller_name"] = billerName;
        data["biller_phone"] = billerPhone;
        data["biller_pickup_address"] = billerAddress;
      }

      if (couponApply) {
        data["user_coupon_code"] = couponApply?.coupon_code;
        data["coupon_id"] = couponApply?._id;
      }

      const res = await order(data);
      
      if (res?.data?.statusCode === 200 && res?.data?.success) {
        if (res?.data?.data?.GatewayPageURL) {
          router.push(res?.data?.data?.GatewayPageURL);
        } else {
          dispatch(allRemoveFromCart());
          router.push(`/order-success/${res?.data?.data.transaction_id}`);
          localStorage.removeItem("copAp");
          toast.success(res?.data?.message);
        }
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (!isLogged) {
    return redirect("/signin");
  }

  return (
    <form
      onSubmit={handleSubmit(handleOrder)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-3 py-3"
    >
      <section className="shadow order-1 lg:order-2">
        <div className="bg-white md:px-10 p-5 w-full mx-auto sticky top-[80px] rounded">
          <h2 className="text-center tracking-normal leading-5 text-lg font-semibold border-b pb-5">
            Complete Order
          </h2>
          <div className="space-y-2">
            <details
              open={true}
              className="group [&_summary::-webkit-details-marker]:hidden mb-5"
            >
              <summary className="bg-bgray-300 py-2.5 px-4 flex justify-between cursor-pointer">
                <h6 className="mb-0">Order Summary</h6>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              {cartProducts?.map((product, i) => (
                <div
                  className="flex items-center gap-2 border-b bg-white py-2 px-4"
                  key={i}
                >
                  <div className="w-[70px] h-[70px] border rounded mr-3">
                    <Image
                      width={100}
                      height={100}
                      loading="lazy"
                      src={product?.product_thumbnail}
                      alt={product?.product_name}
                      className="object-fill rounded"
                    />
                  </div>
                  <div className="flex flex-col flex-1 space-y-2">
                    <h2 className="text-[15px] tracking-tight leading-5 mb-0 font-normal">
                      {product?.product_name}
                    </h2>
                    <div className="flex justify-between items-center mr-2">
                      <p className="text-base text-secondary mb-0 font-medium">
                        {product?.quantity} X{" "}
                        {numberWithCommas(product?.product_price)}৳
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </details>
            <div className="pb-6 md:py-0">
              <div className="flex justify-between p-1 overflow-hidden border rounded focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-4 py-1 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  name="coupon"
                  disabled={couponApply}
                  placeholder="Apply Coupon"
                  aria-label="Apply Coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponApply ? (
                  <div className="px-2 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-200 rounded focus:outline-none">
                    Apply Coupon
                  </div>
                ) : (
                  <div>
                    {couponLoading ? (
                      <div className="cursor-pointer px-2 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary rounded hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                        <MiniSpinner />
                      </div>
                    ) : (
                      <div
                        onClick={handleCheckCoupon}
                        className="cursor-pointer px-2 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-primary rounded hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                      >
                        Apply Coupon
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-3">
              <div className="border rounded-md mb-5">
                <div className="bg-bgray-300 py-2.5 px-4 flex justify-between">
                  <h6 className="mb-0 font-normal">Price Details</h6>
                </div>
                <div className="overflow-x-auto bg-white border py-1">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          Sub-Total
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right font-semibold">
                          ৳{numberWithCommas(totalAmount)}
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          Ecom Discount
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right font-semibold">
                          ৳100
                        </td>
                      </tr> */}
                      <tr>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          Delivery and Handling
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right font-semibold">
                          ৳{Number(deliveryCharge)}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
                          Total
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-gray-700 font-semibold text-right">
                          ৳{numberWithCommas(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="flex items-center text-xs mb-4">
                <input
                  type="checkbox"
                  className="text-xl mr-1"
                  onChange={() => setAgree(!agree)}
                />
                <span>I Agree to the</span>
                <Link
                  href="/term-and-condition"
                  className="text-blue-500 underline mx-1"
                >
                  Terms & Conditions.
                </Link>
                <span>and</span>
                <Link
                  href="/return-and-refunds-policy"
                  className="text-blue-500 underline ml-1 inline-block"
                >
                  Retrun & Refund Policy
                </Link>
              </p>
              <div className="flex justify-between">
                <Link
                  href={`/cart`}
                  className="block w-[100px] text-center py-2 bg-primaryColor text-white rounded-sm text-sm"
                >
                  Back
                </Link>
                {cartProducts?.length > 0 ? (
                  <div>
                    {orderLoading || isLoading ? (
                      <button
                        disabled
                        className={`block w-[120px] text-center py-2 text-white rounded-sm text-sm ${
                          !agree ? "bg-gray-300" : "bg-primaryColor"
                        }`}
                      >
                        <MiniSpinner />
                      </button>
                    ) : (
                      <button
                        disabled={!agree}
                        className={`block w-[120px] text-center py-2 text-white rounded-sm text-sm ${
                          !agree ? "bg-gray-300" : "bg-primaryColor"
                        }`}
                      >
                        Order Confirm
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <Link
                      href={`/`}
                      className="px-4 text-center py-2 text-white bg-primary rounded-sm text-sm"
                    >
                      Continue Shipping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm">
            <span className="text-error-300">*</span> Add more items to reduce
            delivery charge
          </p>
        </div>
      </section>
      <section className="space-y-5">
        <div className="bg-white rounded shadow-sm">
          {/* recipient content */}
          <div className="flex items-center gap-2 bg-gray-200 px-4 py-2">
            <p className="bg-primary text-white h-6 w-6 rounded-full flex justify-center items-center font-normal mb-0">
              1
            </p>
            <h2 className="text-lg font-medium tracking-normal leading-5 mb-0">
              Delivery
            </h2>
          </div>
          <div className="p-5 space-y-3">
            <div className="form-control w-full">
              <label htmlFor="division" className="label">
                <span className="label-text">Division</span>
              </label>
              <Select
                id="division"
                name="division"
                required
                aria-label="Select a Division"
                isSearchable={true}
                options={divisions}
                getOptionLabel={(x) => x?.name}
                getOptionValue={(x) => x?.id}
                onChange={(selectedOption) => {
                  setDivisionId(selectedOption?.id);
                  setDivision(selectedOption?.name);
                }}
              ></Select>
            </div>

            {divisionId && (
              <div className="form-control w-full">
                <label htmlFor="district" className="label">
                  <span className="label-text">District</span>
                </label>
                <Select
                  id="district"
                  name="district"
                  required
                  aria-label="Select a District"
                  isSearchable={true}
                  options={districtsData}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setDistrictId(selectedOption?.id);
                    setDistrict(selectedOption?.name);
                  }}
                ></Select>
              </div>
            )}

            {districtId && (
              <div className="form-control w-full">
                <label htmlFor="city" className="label">
                  <span className="label-text">City</span>
                </label>
                <Select
                  id="city"
                  name="city"
                  required
                  aria-label="Select a city"
                  isSearchable={true}
                  options={citiesData}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setCity(selectedOption?.name);
                  }}
                ></Select>
              </div>
            )}
            {city && (
              <div className="space-y-1">
                <label htmlFor="courier" className="label">
                  <span className="label-text">Delivery Method</span>
                </label>
                <label
                  htmlFor="courier"
                  className="flex cursor-pointer justify-between gap-4 rounded border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <div>
                    <p className="text-gray-700 mb-0">Courier</p>
                  </div>

                  <input
                    type="radio"
                    name="delivery_method"
                    value="courier"
                    id="courier"
                    checked={deliveryMethod === "courier"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setDeliveryCharge("60");
                    }}
                    className="size-5 border-gray-300 text-blue-500"
                    required
                    aria-checked="true"
                  />
                </label>
                <label
                  htmlFor="store"
                  className="flex cursor-pointer justify-between gap-4 rounded border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                  <div>
                    <p className="text-gray-700 mb-0">Store</p>
                  </div>

                  <input
                    type="radio"
                    name="delivery_method"
                    value="store"
                    id="store"
                    checked={deliveryMethod === "store"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setDeliveryCharge("0");
                    }}
                    className="size-5 border-gray-300 text-blue-500"
                    required
                    aria-checked="true"
                  />
                </label>
              </div>
            )}

            {deliveryMethod === "courier" && (
              <div className="space-y-3">
                <div className="form-control w-full">
                  <Select
                    name="delivery_method_type"
                    required={deliveryMethod === "courier"}
                    aria-label="Select a pickup point"
                    options={addressData}
                    getOptionLabel={(x) => x?.label}
                    getOptionValue={(x) => x?.value}
                    onChange={(selectedOption) => {
                      setDeliveryMethodType(selectedOption?.value);
                    }}
                  ></Select>
                </div>
                <div>
                  <label className="sr-only" htmlFor="address">
                    Address
                  </label>

                  <textarea
                    className="w-full rounded border border-gray-200 p-3 text-sm"
                    placeholder="Write your prefer pickup address"
                    rows="3"
                    id="address"
                    required={deliveryMethod === "courier"}
                    value={deliveryPickupAddress}
                    onChange={(e) => setDeliveryPickupAddress(e.target.value)}
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label htmlFor="courier" className="label">
                    <span className="label-text">Delivery Charge</span>
                  </label>
                  <label
                    htmlFor="inside_dhaka"
                    className="flex cursor-pointer justify-between gap-4 rounded border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700 mb-0">
                        In-Side Dhaka 60 Taka
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="delivery_charge"
                      value={60}
                      id="inside_dhaka"
                      checked={deliveryCharge === "60"}
                      onChange={(e) => setDeliveryCharge(e.target.value)}
                      className="size-5 border-gray-300 text-blue-500"
                      required
                      aria-checked="true"
                    />
                  </label>
                  <label
                    htmlFor="outside_dhaka"
                    className="flex cursor-pointer justify-between gap-4 rounded border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700 mb-0">
                        Out-Side Dhaka 160 taka
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="delivery_charge"
                      value={160}
                      id="outside_dhaka"
                      checked={deliveryCharge === "160"}
                      onChange={(e) => setDeliveryCharge(e.target.value)}
                      className="size-5 border-gray-300 text-blue-500"
                      required
                      aria-checked="true"
                    />
                  </label>
                </div>
                {/* <div className="form-control w-full">
                  <label htmlFor="city" className="label">
                    <span className="label-text">Customar Information</span>
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="sr-only" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full rounded border border-gray-200 p-3 text-sm"
                        placeholder="Name"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="w-full rounded border border-gray-200 p-3 text-sm"
                        placeholder="Contact no (Person who will pickup)"
                        type="tel"
                        id="phone"
                      />
                    </div>
                  </div>
                </div> */}
                <p className="flex items-center text-xs mb-4">
                  <input
                    type="checkbox"
                    className="text-xl mr-1"
                    onChange={() => setIsBillingAddress(!isBillingAddress)}
                  />
                  <span>If billing address is different</span>
                </p>
              </div>
            )}

            {isBillingAddress && (
              <div className="form-control w-full">
                <label htmlFor="city" className="label">
                  <span className="label-text">Billing Information</span>
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="sr-only" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-full rounded border border-gray-200 p-3 text-sm"
                      placeholder="Name"
                      type="text"
                      required={isBillingAddress}
                      value={billerName}
                      onChange={(e) => setBillerName(e.target.value)}
                      id="name"
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded border border-gray-200 p-3 text-sm"
                      placeholder="Contact no (Person who will pickup)"
                      type="tel"
                      id="phone"
                      required={isBillingAddress}
                      value={billerPhone}
                      onChange={(e) => setBillerPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="address">
                      Address
                    </label>

                    <textarea
                      className="w-full rounded border border-gray-200 p-3 text-sm"
                      placeholder="Write your prefer pickup address"
                      rows="3"
                      required={isBillingAddress}
                      id="address"
                      value={billerAddress}
                      onChange={(e) => setBillerAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            {deliveryMethod && (
              <div className="border p-2 rounded">
                <span className="font-semibold">Attention</span>
                <p className="text-xs mb-0 font-medium">
                  01. A notification will be sent (within 1 to 5 days) when
                  product is ready for delivery.
                </p>
                <p className="text-xs font-medium">
                  02. Delivery and Handling charges must be paid in advance.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="rounded">
          {/* payment content */}
          <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 mb-2 rounded shadow-sm">
            <p className="bg-primary text-white h-6 w-6 rounded-full flex justify-center items-center font-normal mb-0">
              2
            </p>
            <h2 className="text-lg font-medium tracking-normal leading-5 mb-0">
              Payment
            </h2>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="cod"
              className="flex cursor-pointer justify-between gap-4 rounded bg-white px-4 py-2 text-sm font-medium shadow-sm border hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700 mb-0">Cash On Delivery</p>
              </div>

              <input
                type="radio"
                name="payment_type"
                value="cod"
                id="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="size-5 text-blue-500 border"
              />
            </label>
            <label
              htmlFor="online"
              className="flex cursor-pointer justify-between gap-4 rounded bg-white px-4 py-2 text-sm font-medium shadow-sm border hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700 mb-0">ssl commerze</p>
              </div>

              <input
                type="radio"
                name="payment_type"
                value="online"
                id="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="size-5 text-blue-500"
              />
            </label>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CheckoutSection;
