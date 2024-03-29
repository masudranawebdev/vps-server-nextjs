"use client";
import AddPcBuilderBtn from "@/components/common/AddPcBuilderBtn";
import { addToPcbuild } from "@/redux/feature/pcbuild/pcbuildSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PcBuilderProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const pcbuildProducts = useSelector((state) => state.pcbuild.products);
  const router = useRouter();

  return (
    <>
      <div className="border hover:border-secondary shadow-md hover:shadow-secondary group rounded-lg relative overflow-hidden bg-white">
        <div className="overflow-hidden relative">
          <div className="border-b mb-4">
            <Link target="_blank" href={`/${product?.product_slug}`}>
              <Image
                width={500}
                height={500}
                src={product?.product_thumbnail}
                alt={product?.product_name}
                className="group-hover:scale-105 transition-all duration-500 rounded-lg p-3"
                loading="lazy"
              />
            </Link>
          </div>
          {/* <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary px-2 py-[6px] rounded group-hover:top-1/2 transition-all duration-700`}
          >
            <div className="flex items-center justify-center gap-2">
              <button
                data-tooltip-id="wish-list"
                data-tooltip-content="Wishlist"
              >
                <CiHeart className="text-2xl font-bold text-textColor" />
              </button>
              <span className="inline-block h-[20px] w-[2px] bg-gray-200"></span>
              <button data-tooltip-id="compare" data-tooltip-content="Compare">
                <TfiControlShuffle className="text-2xl font-bold text-textColor" />
              </button>
              <span className="inline-block h-[20px] w-[2px] bg-gray-200"></span>
              <button
                onClick={() => {
                  openModal();
                  setViewProduct(product);
                }}
                data-tooltip-id="quick-view"
                data-tooltip-content="Quick View"
              >
                <FaEye className="text-xl font-bold text-textColor" />
              </button>
            </div>
          </div> */}
        </div>
        <div className="px-2 pb-3 flex flex-col justify-between">
          <Link
            target="_blank"
            href={`/${product?.product_slug}`}
            className="h-14"
          >
            <p className="hover:underline hover:text-secondary transition-colors duration-300 text-sm md:text-sm font-normal md:font-medium text-black leading-5 tracking-tight mb-4 line-clamp-2">
              {product?.product_name}
            </p>
          </Link>
          <article className="mb-4 border-b">
            <div
              dangerouslySetInnerHTML={{ __html: product?.product_key_feature }}
              className="text-xs h-[200px]"
            ></div>
          </article>
          <article className="flex flex-col justify-evenly">
            <div className="flex flex-col justify-between items-center">
              <p className="flex flex-col h-full items-center px-[2px] mb-3">
                <span className="text-primaryColor font-semibold">
                  {product?.product_discount_price
                    ? numberWithCommas(product?.product_discount_price)
                    : numberWithCommas(product?.product_price)}
                  ৳
                </span>
              </p>
              <AddPcBuilderBtn className="relative rounded px-2 py-1 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300">
                <button
                  onClick={() => {
                    const isExistCart = pcbuildProducts.find(
                      (cartItem) => cartItem?.productId === product?._id
                    );
                    if (isExistCart) {
                      toast.error("Already is added pcbuild", {
                        autoClose: 1500,
                      });
                    } else {
                      dispatch(
                        addToPcbuild({
                          pc_builder_name:
                            product?.pc_builder_id?.pc_builder_name,
                          required: product?.pc_builder_id?.pc_builder_required,
                          productId: product?._id,
                          product_thumbnail: product?.product_thumbnail,
                          product_name: product?.product_name,
                          quantity: 1,
                          price: product?.product_ecommerce_price
                            ? product?.product_ecommerce_price
                            : product?.product_discount_price
                            ? product?.product_discount_price
                            : product?.product_price,
                          product_price: product?.product_ecommerce_price
                            ? product?.product_ecommerce_price
                            : product?.product_discount_price
                            ? product?.product_discount_price
                            : product?.product_price,
                        })
                      );
                      toast.success("Successfully added to Pc Build", {
                        autoClose: 1500,
                      });
                      router.push("/pc-builder");
                    }
                  }}
                  className="flex items-center gap-[2px]"
                >
                  <span className="text-sm font-normal">Add to pc builder</span>
                </button>
              </AddPcBuilderBtn>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default PcBuilderProductCard;
