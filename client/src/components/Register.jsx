import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const initialValues = {
  email: "",
  username: "",
  phone: "",
  password: "",
  rePass: "",
};

export default function Register() {
  const {
    register,
    errors,
    pending,
    validateForm,
    setError,
    checkIsDataAvailable,
  } = useRegister();

  const navigate = useNavigate();

  const registerHandler = async () => {
    if (pending) return;

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const isAvailable = await checkIsDataAvailable(email, username, phone);
    if (!email || !username || !phone) {
      return;
    }

    if (!isAvailable) return;

    try {
      await register(email, username, phone, password, rePass);

      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError({ server: "Registration failed. Please try again." });
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler
  );

  const { email, username, phone, password, rePass } = values;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={10}
            minLength={10}
          />
          {errors?.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="rePass"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="rePass"
            name="rePass"
            value={rePass}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.rePass && <p className="text-red-500">{errors.rePass}</p>}
        </div>

        {errors?.server && <span>{errors.server}</span>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
