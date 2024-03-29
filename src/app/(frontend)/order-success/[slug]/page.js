import OrderSuccess from "../../../../components/frontend/ui/ordersuccess/OrderSuccess";

export const metadata = {
  title: "Order Success",
  description: "Generated by Masud Rana",
  authors: {
    name: "Masud Rana",
    url: "https://www.facebook.com/masudranawebdev",
  },
};

const OrderSuccessPage = ({ params }) => {
  const { slug } = params;
  return (
    <div className="container">
      <OrderSuccess tranxId={slug} />
    </div>
  );
};

export default OrderSuccessPage;