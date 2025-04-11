import { useProfileEdit } from "../../hooks/useProfile";

export default function ProfileEdit({ toggleEditMode }) {
  const {
    values,
    changeHandler,
    submitHandler,
    pending,
    errors,
  } = useProfileEdit(toggleEditMode);

  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-6 bg-white p-6">
      <FormField
        id="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={changeHandler}
        error={errors.email}
      />

      <FormField
        id="username"
        label="Username"
        type="text"
        value={values.username}
        onChange={changeHandler}
        error={errors.username}
      />

      <FormField
        id="phone"
        label="Phone"
        type="text"
        value={values.phone}
        onChange={changeHandler}
        maxLength={10}
        error={errors.phone}
      />

      <FormField
        id="img"
        label="Image URL"
        type="text"
        value={values.img}
        onChange={changeHandler}
        error={errors.img}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={pending}
      >
        {pending ? "Saving..." : "Save"}
      </button>

      <button
        type="button"
        onClick={toggleEditMode}
        className="w-full bg-gray-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-gray-600 transition duration-200"
      >
        Cancel
      </button>

      {errors.general && (
        <p className="text-red-500 text-sm mt-2">{errors.general}</p>
      )}
    </form>
  );
}

function FormField({ id, label, type, value, onChange, error, maxLength }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
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
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

