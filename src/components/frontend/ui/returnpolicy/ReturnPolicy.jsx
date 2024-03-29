import Breadcrumb from "@/components/common/BreadCrum";
const crumbs = [{ label: "Return Policy", path: "/return-policy" }];
const ReturnPolicy = ({ returnPolicyData }) => {
  return (
    <div>
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div
        className="p-5 border rounded shadow-sm bg-white"
        dangerouslySetInnerHTML={{ __html: returnPolicyData }}
      ></div>
    </div>
  );
};

export default ReturnPolicy;
