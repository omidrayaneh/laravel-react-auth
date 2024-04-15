import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const formHandle = (e)=>{
    e.preventDefault();
    if (user.id) {
      //update user
      axiosClient.put(`/users/${user.id}`,user)
      .then((response)=>{
        Toast.fire({
          icon: "success",
          title: "User successfully updated",
        });
          navigate('/users')
         
      })
      .catch((err)=>{
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(err.response.data.errors);

        }
      })
    }else{
      //update user
      axiosClient.post(`/users`,user)
      .then((response)=>{
        Toast.fire({
          icon: "success",
          title: "User successfully Created",
        });
          navigate('/users')
          
      })
      .catch((err)=>{
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(err.response.data.errors);

        }
      })

         //create new user
         axiosClient.post(`/users`,user)
         .then((response)=>{
           console.log(response);
            
             Toast.fire({
               icon: "success",
               title: "User successfully updated",
             });
             navigate('/users')
         })
         .catch((err)=>{
           const response = err.response;
           if (response && response.status === 422) {
             setErrors(err.response.data.errors);
   
           }
         })
    }
      

  }
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }
  return (
    <div className="p-20">
      <div className="p-5 flex justify-center">
        {user && (
          <div className="">
            {loading && (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="flext justify-center"
              />
            )}
          </div>
        )}
      </div>
      {!loading && (
        <form className="max-w-md mx-auto" onSubmit={formHandle}>
          <div className="flex justify-center">
           {user.id &&  <h3>Update User : <span className="text-red-400"> {user.name}</span></h3>}
           {!user.id &&  <h3>New User</h3>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={user.name}
              onChange={e => setUser({...user,name:e.target.value})}
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={user.email}
              onChange={e => setUser({...user,email:e.target.value})}
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={e => setUser({...user,password:e.target.value})}
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={e => setUser({...user,password_confirmation:e.target.value})}
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password_confirmation"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password Confirmation``
            </label>
            {errors.password_confirmation &&
                     <div
                     className="bg-red-100 border border-red-400 text-red-700   rounded relative mt-1 p-1 "
                     role="alert"
                   >
                     <span className="block sm:inline text-sm">
                       {errors.password_confirmation}
                     </span>
                   </div>
                    }
          </div>

        

        <div className="flex justify-between">
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
            rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
          onClick={() => navigate('/users')}
            className="text-white bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
            rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancle
          </button>
        </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
