"use client"
import CreateProduct from "@/components/admin/product/productCreate/CreateProduct";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const ProductCreatePage = () => {

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Add Product</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/product/product-create">
            <p className="font-semibold">Add Product</p>
          </Link>
        </div>
      </div>

      {/* Step start */}

      <CreateProduct />

      {/* Step end */}

    </>
  );
};

export default ProductCreatePage;
