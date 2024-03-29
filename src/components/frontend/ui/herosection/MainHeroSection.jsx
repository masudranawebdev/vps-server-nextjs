import HeroSection from "./HeroSection";

const MainHeroSection = async ({ promiseBannerData, promiseMenuData }) => {
  const [bannerData, menuData] = await Promise.all([
    promiseBannerData,
    promiseMenuData,
  ]);
  return (
    <div>
      <HeroSection bannerData={bannerData?.data} menuData={menuData?.data} />
    </div>
  );
};

export default MainHeroSection;
