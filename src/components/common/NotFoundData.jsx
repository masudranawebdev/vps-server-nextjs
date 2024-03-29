import { GoDatabase } from "react-icons/go";
const NotFoundData = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <GoDatabase className="p-5 text-[80px] md:text-[100px] lg:text-[120px] xl:text-[150px] bg-secondary text-textColor rounded-full" />
      <p className="mt-5 text-base lg:text-xl">Not Found Data!</p>
    </div>
  );
};

export default NotFoundData;
