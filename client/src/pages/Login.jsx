import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);

  const { setUser, setToken } = useStateContext();

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
    .post("/login", payload)
    .then(({ data }) => {
      setToken(data.token);
      setUser(data.user);
    })
    .catch((err) => {
      const response = err.response;
      if (response && response.status === 422) {
        if (response.data.errors) {
          setErrors(response.data.errors);
        }
        else{
          setErrors({
            email: [response.data.message]
          })
        }

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
                Login Page
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleLogin}>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      ref={emailRef}
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
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      ref={passwordRef}
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
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="">
                  <span className="text-gray-300">Not Register? </span>
                  <Link to="/register">Create an account</Link>
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

export default Login;
