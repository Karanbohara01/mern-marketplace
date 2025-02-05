import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8000/api/v1/user/forgetPassword", values)
        .then(() => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            toast.error("Email not found");
          } else {
            console.error("Unexpected error:", error);
            toast.error("Server error");
          }
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
              aria-label="Email Address"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full px-3 py-2 border rounded ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              aria-invalid={formik.touched.email && !!formik.errors.email}
              aria-describedby="emailError"
            />
            {formik.touched.email && formik.errors.email ? (
              <p id="emailError" className="text-red-500 text-xs italic mt-2">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
