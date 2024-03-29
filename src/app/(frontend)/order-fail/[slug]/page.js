import OrderFail from "@/components/frontend/ui/orderfail/OrderFail";

export const metadata = {
  title: "Order Success",
  description: "Generated by Masud Rana",
  authors: {
    name: "Masud Rana",
    url: "https://www.facebook.com/masudranawebdev",
  },
};

const OrderFailPage = () => {
  return (
    <div className="container">
      <OrderFail />
    </div>
  );
};

export default OrderFailPage;