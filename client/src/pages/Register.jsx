import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState([]);

  const { setUser, setToken } = useStateContext();

  const handleRegister = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(err.response.data.errors);

        }
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold mt-2 text-violet-400">
                Register Page
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleRegister}>
                  <div className="relative">
                    <input
                      ref={nameRef}
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                    {errors.name &&
                     <div
                     className="bg-red-100 border border-red-400 text-red-700   rounded relative mt-1 p-1 "
                     role="alert"
                   >
                     <span className="block sm:inline text-sm">
                       {errors.name}
                     </span>
                   </div>
                    }
                  </div>
                     
                  <div className="relative mt-4">
                    <input
                      ref={emailRef}
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {errors.email &&
                     <div
                     className="bg-red-100 border border-red-400 text-red-700   rounded relative mt-1 p-1 "
                     role="alert"
                   >
                     <span className="block sm:inline text-sm">
                       {errors.email}
                     </span>
                   </div>
                    }
                  </div>
                  <div className="relative mt-4">
                    <input
                      ref={passwordRef}
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {errors.password &&
                     <div
                     className="bg-red-100 border border-red-400 text-red-700   rounded relative mt-1 p-1 "
                     role="alert"
                   >
                     <span className="block sm:inline text-sm">
                       {errors.password}
                     </span>
                   </div>
                    }
                  </div>
                  <div className="relative mt-4">
                    <input
                      ref={passwordConfirmationRef}
                      autoComplete="off"
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password Confirmation"
                    />
                    <label
                      htmlFor="password_confirmation"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password Confirmation
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="">
                  <span className="text-gray-400">
                    If You Already Registered?{" "}
                  </span>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 text-center text-white bg-gray-800">

        <a className="text-gray-200 underline" href=""></a>
    </div> */}
    </div>
  );
};

export default Register;
