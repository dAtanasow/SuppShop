import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

export default function Login() {
  const navigate = useNavigate();
  const { login, errors, pending } = useLogin();

  const { values, changeHandler, submitHandler } = useForm(
    { email: "", password: "" },
    async (values) => {
      try {
        const authData = await login(values.email, values.password);
        if (authData) {
          navigate("/");
        }
      } catch (err) {
        console.error("Error during login:", err.message);
      }
    }
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {errors?.general && (
          <p className="text-red-500 text-center mb-4">{errors.general}</p>
        )}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
            value={values?.email}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
            value={values?.password}
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors?.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
