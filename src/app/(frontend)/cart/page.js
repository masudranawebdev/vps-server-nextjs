import CartSection from "@/components/frontend/ui/cart/CartSection";
export const metadata = {
  title: "Cart",
  description: "Generated by Masud Rana",
  authors: {
    name: "Masud Rana",
    url: "https://www.facebook.com/masudranawebdev",
  },
};

const CartPage = () => {
  return (
    <div className="container">
      <CartSection />
    </div>
  );
};

export default CartPage;
