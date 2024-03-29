import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";

const MainOfferSectionCard = ({ offer }) => {
  const startDate = formatDate(offer?.offer_start_date);
  const endDate = formatDate(offer?.offer_end_date);
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 border bg-white">
      <Image
        height={500}
        width={500}
        alt={offer?.offer_title}
        src={offer?.offer_image}
        className="h-96 w-full rounded-md object-cover"
        loading="lazy"
      />

      <div className="mt-2">
        <dl>
          <div className="mb-1">
            <dt className="sr-only">Price</dt>

            <dd className="text-sm font-bold">
              <SlCalender className="mr-2 inline-block" />
              <span className="text-xs">{startDate}</span>-
              <span className="text-xs">{endDate}</span>
            </dd>
          </div>

          <div>
            <dt className="sr-only">Tittle</dt>

            <dd className="font-medium truncate text-ellipsis text-center mt-3">
              {offer?.offer_title}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500 text-base mb-0">
                {offer?.offer_outlet}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Link
            href={`/offer/${offer?._id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-secondary border border-secondary rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainOfferSectionCard;
