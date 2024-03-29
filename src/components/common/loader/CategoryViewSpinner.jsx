const CategoryViewSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-primaryColor bg-opacity-50">
      <div className="relative rounded-full h-20 w-20 border-t-4 border-secondary animate-spin"></div>
    </div>
  );
};

export default CategoryViewSpinner;
