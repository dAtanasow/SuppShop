import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function SellerInfo({ authorData }) {
  const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);

  const toggleSellerInfo = () => {
    setIsSellerInfoOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full mt-5 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h3
        className="text-lg text-gray-900 m-3 text-center cursor-pointer flex items-center justify-center gap-2"
        onClick={toggleSellerInfo}
      >
        Seller Information
        {isSellerInfoOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-700" />
        )}
      </h3>
      <div
        className={`${
          isSellerInfoOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300`}
      >
        <img
          src={authorData?.img}
          alt={authorData?.username || "Seller"}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm mx-auto block"
        />
        <div className="text-gray-700 p-3 text-base space-y-1 text-center">
          <p>
            <span className="font-semibold text-gray-800">Name: </span>
            {authorData?.username || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Email: </span>
            {authorData?.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Phone: </span>
            {authorData?.phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
