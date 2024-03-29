import CheckoutSection from "@/components/frontend/ui/checkout/CheckoutSection";
export const metadata = {
  title: "Checkout",
  description: "Generated by Masud Rana",
  authors: {
    name: "Masud Rana",
    url: "https://www.facebook.com/masudranawebdev",
  },
};

const CheckoutPage = () => {
  return (
    <div className="container">
      <CheckoutSection />
    </div>
  );
};

export default CheckoutPage;