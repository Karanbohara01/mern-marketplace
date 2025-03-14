

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Introduce a small delay to allow "Verifying..." message to be seen
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.get(
          `http://localhost:8000/api/v1/user/verify/${token}`
        );
        setMessage(response.data.message);
        setVerificationSuccess(true); // Mark as success
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed.");
        setVerificationSuccess(false); // Mark as failure
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
        <p className="text-gray-600">Verifying...</p> // ✅ Ensures this is always visible while loading
      ) : (
        <>
          {message && (
            <div
              className={`message-box ${
                verificationSuccess
                  ? "bg-green-100 border border-green-300 text-green-700"
                  : "bg-red-100 border border-red-300 text-red-700"
              } p-4 rounded-md mt-5 text-center max-w-md w-full`}
            >
              <p>{message}</p>
            </div>
          )}

          {/* ✅ Show login button only if verification succeeded */}
          {verificationSuccess && (
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
