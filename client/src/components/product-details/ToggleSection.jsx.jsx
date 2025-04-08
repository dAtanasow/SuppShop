import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function ToggleSection({ title, content, isOpen, toggle }) {
  return (
    <div className="pt-4">
      <div
        className="bg-gray-200 p-2 rounded-md cursor-pointer flex justify-between items-center"
        onClick={toggle}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-gray-700" />
        )}
      </div>
      {isOpen && <p className="text-gray-600 p-2">{content}</p>}
    </div>
  );
}
