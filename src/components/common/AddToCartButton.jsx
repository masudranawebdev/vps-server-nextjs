const AddToCartButton = ({ children, className }) => {
  return (
    <div className={className}>
      <div className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-secondary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default AddToCartButton;
