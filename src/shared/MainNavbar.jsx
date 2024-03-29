import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), { ssr: true });
const MainNavbar = ({ menuData }) => {
  return (
    <>
      <Navbar menuData={menuData} />
    </>
  );
};

export default MainNavbar;
