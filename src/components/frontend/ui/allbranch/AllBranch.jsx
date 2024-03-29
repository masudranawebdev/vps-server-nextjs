import Breadcrumb from "@/components/common/BreadCrum";
const crumbs = [{ label: "All Branch", path: "/all-branch" }];
const AllBranch = ({ allBranchData }) => {
  return (
    <div>
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div
        className="p-5 border rounded shadow-sm bg-white"
        dangerouslySetInnerHTML={{ __html: allBranchData }}
      ></div>
    </div>
  );
};

export default AllBranch;
