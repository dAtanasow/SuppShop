import { useProfileEdit } from "../../hooks/useProfile";
import FormField from "../FormField";

export default function ProfileEdit({ toggleEditMode }) {
  const { values, changeHandler, submitHandler, pending, errors } =
    useProfileEdit(toggleEditMode);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-6 items-center"
    >
      <div className="w-full sm:w-[384px] px-4 py-2">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={changeHandler}
          error={errors.email}
        />
      </div>

      <div className="w-full sm:w-[384px] px-4 py-2">
        <FormField
          id="username"
          label="Username"
          type="text"
          value={values.username}
          onChange={changeHandler}
          error={errors.username}
        />
      </div>

      <div className="w-full sm:w-[384px] px-4 py-2">
        <FormField
          id="phone"
          label="Phone"
          type="text"
          value={values.phone}
          onChange={changeHandler}
          maxLength={10}
          error={errors.phone}
        />
      </div>

      <div className="w-full sm:w-[384px] px-4 py-2">
        <FormField
          id="img"
          label="Image URL"
          type="text"
          value={values.img}
          onChange={changeHandler}
          error={errors.img}
        />
      </div>

      {errors.general && (
        <p className="text-red-500 text-sm -mt-2">{errors.general}</p>
      )}

      <div className="flex flex-col gap-3 pt-4 w-full sm:w-[384px] px-4 py-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={pending}
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={toggleEditMode}
          className="w-full bg-gray-300 text-gray-800 text-lg font-medium py-3 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
