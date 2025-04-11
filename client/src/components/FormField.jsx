export default function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  maxLength,
  isRequired = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required={isRequired}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
