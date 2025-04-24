import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import FormField from "./FormField";

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
    <div className="min-h-screen bg-white sm:bg-gray-100 sm:flex sm:justify-center sm:items-center">
      <form
        onSubmit={submitHandler}
        className="w-full h-full px-4 pt-20 sm:pt-8 sm:h-auto sm:bg-white sm:rounded-xl sm:shadow-md sm:max-w-md"
      >
        {errors?.general && (
          <p className="text-red-500 text-center mb-4">{errors.general}</p>
        )}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <FormField
          id="email"
          label="Email"
          type="text"
          value={values.email}
          onChange={changeHandler}
          error={errors?.email}
          isRequired
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={changeHandler}
          error={errors?.password}
          isRequired
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white mt-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 p-5">
            You don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
