import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import FormField from "./FormField";

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
    <div className="min-h-screen bg-white sm:bg-gray-100 sm:flex sm:justify-center sm:items-center">
      <form
        onSubmit={submitHandler}
        className="w-full h-full px-4 pt-20 sm:pt-8 sm:h-auto sm:bg-white sm:rounded-xl sm:shadow-md sm:max-w-md"
      >
        {errors?.general && (
          <p className="text-red-500 text-center mb-4">{errors.general}</p>
        )}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>

        <FormField
          id="email"
          label="Email"
          type="text"
          value={email}
          onChange={changeHandler}
          error={errors?.email}
          isRequired
        />

        <FormField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={changeHandler}
          error={errors?.username}
          isRequired
        />

        <FormField
          id="phone"
          label="Phone"
          type="text"
          value={phone}
          onChange={changeHandler}
          error={errors?.phone}
          isRequired
          minLength={10}
          maxLength={10}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={changeHandler}
          error={errors?.password}
          isRequired
        />

        <FormField
          id="rePass"
          label="Confirm Password"
          type="password"
          value={rePass}
          onChange={changeHandler}
          error={errors?.rePass}
          isRequired
        />

        {errors?.server && (
          <span className="text-red-500 block text-center mt-4">
            {errors.server}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white mt-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
        >
          {pending ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
