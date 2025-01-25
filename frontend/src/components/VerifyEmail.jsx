import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/verify/${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 border border-gray-300 rounded-lg p-5 max-w-md mx-auto mt-5">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">
        Email Verification
      </h2>
      {loading ? (
        <p className="text-gray-600">Verifying...</p>
      ) : (
        <>
          {message && (
            <div
              className={`message-box ${
                message.includes("success")
                  ? "bg-green-100 border border-green-300 text-green-700"
                  : "bg-red-100 border border-red-300 text-red-700"
              } p-4 rounded-md mt-5 text-center max-w-md w-full`}
            >
              <p>{message}</p>
            </div>
          )}
          {message && message.includes("success") && (
            <Link
              to="/login"
              className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Go to Login
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
