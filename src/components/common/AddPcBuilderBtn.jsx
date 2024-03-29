const AddPcBuilderBtn = ({ children }) => {
  return (
    <div className="relative rounded px-3 py-1.5 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300">
      <div className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-secondary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default AddPcBuilderBtn;
