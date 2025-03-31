import { useProfileEdit } from "../../hooks/useProfile";

export default function ProfileEdit({ toggleEditMode }) {
  const { values, changeHandler, submitHandler, pending } =
    useProfileEdit(toggleEditMode);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col space-y-6 bg-white p-6"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values?.email || ""}
          onChange={changeHandler}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={values?.username || ""}
          onChange={changeHandler}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={values?.phone || ""}
          onChange={changeHandler}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="img"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Image URL
        </label>
        <input
          type="text"
          id="img"
          name="img"
          value={values?.img || ""}
          onChange={changeHandler}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md 
  hover:bg-blue-600 hover:shadow-lg transition duration-200 focus:outline-none 
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
    </form>
  );
}
