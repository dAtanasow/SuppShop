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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

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

        {errors?.server && <span>{errors.server}</span>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-5 p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
