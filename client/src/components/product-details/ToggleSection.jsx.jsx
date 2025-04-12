import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function ToggleSection({ title, content, isOpen, toggle }) {
  if (!content) return null;
  return (
    <div className="pt-4">
      <button
        onClick={toggle}
        className="w-full bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center text-left shadow-sm hover:bg-gray-200 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700 px-4 py-2">{content}</p>
      </div>
    </div>
  );
}
