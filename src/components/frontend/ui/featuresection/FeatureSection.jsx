import Image from "next/image";

const FeatureSection = async ({ promiseFeatureData }) => {
  const featureData = await promiseFeatureData;
  return (
    <div className="container mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-5 justify-between py-5">
      {featureData?.data[0]?.card_one_logo && (
        <div className="bg-white flex items-center gap-2 border shadow py-1 lg:py-[15px] px-1 lg:px-5 rounded-md">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={featureData?.data[0]?.card_one_logo}
              alt="logo one"
              width={15}
              height={15}
            />
          </div>
          <p className="mb-0 text-sm lg:text-base font-normal lg:font-semibold text-primaryColor text-wrap">
            {featureData?.data[0]?.card_one_title}
          </p>
        </div>
      )}

      {featureData?.data[0]?.card_two_logo && (
        <div className="bg-white flex items-center gap-2 border shadow py-1 lg:py-[15px] px-1 lg:px-5 rounded-md">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={featureData?.data[0]?.card_two_logo}
              alt="logo two"
              width={15}
              height={15}
            />
          </div>
          <p className="mb-0 text-sm lg:text-base font-normal lg:font-semibold text-primaryColor text-wrap">
            {featureData?.data[0]?.card_two_title}
          </p>
        </div>
      )}
      {featureData?.data[0]?.card_three_logo && (
        <div className="bg-white flex items-center gap-2 border shadow py-1 lg:py-[15px] px-1 lg:px-5 rounded-md">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={featureData?.data[0]?.card_three_logo}
              alt="logo three"
              width={15}
              height={15}
            />
          </div>
          <p className="mb-0 text-sm lg:text-base font-normal lg:font-semibold text-primaryColor text-wrap">
            {featureData?.data[0]?.card_three_title}
          </p>
        </div>
      )}
      {featureData?.data[0]?.card_four_logo && (
        <div className="bg-white flex items-center gap-2 border shadow py-1 lg:py-[15px] px-1 lg:px-5 rounded-md">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Image
              src={featureData?.data[0]?.card_four_logo}
              alt="logo one"
              width={15}
              height={15}
            />
          </div>
          <p className="mb-0 text-sm lg:text-base font-normal lg:font-semibold text-primaryColor text-wrap">
            {featureData?.data[0]?.card_four_title}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeatureSection;
