import { useEffect,useState } from "react";
import axiosClient from "../axios-client";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      getUsers()
  },[])

  const getUsers=()=>{
    setLoading(true)
    axiosClient.get('/users')
    .then(({data}) =>{
      setLoading(false)
      console.log(data);
      const response = data.response
      setUsers(response.data.users)
    })
    .catch(()=>{
      setLoading(false)
    })
  }
  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome to Users Page</h2>
      </div>
    </div>
  );
};

export default Users;
