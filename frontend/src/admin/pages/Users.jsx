import UserModal from "../Components/UserModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Confirm } from "notiflix";
import toast from "react-hot-toast";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleDeleteUser = async id => {
    Confirm.show(
      "Delete User",
      "Are you sure you want to delete this user?",
      "Delete",
      "Cancel",
      async () => {
        try {
          await axios.delete(`http://localhost:8080/user/${id}`);

          setUsers(prev => prev.filter(user => user._id !== id));

          toast.success("User deleted successfully");
        } catch (error) {
          toast.error("Failed to delete user");
        }
      },
      () => {},
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user");

        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    user =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search User..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          />
          <span className="text-slate-400">
            Total Users: {filteredUsers.length}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] table-fixed">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="w-[12%] py-3 text-center">Profile</th>
                <th className="w-[18%] py-3 text-center">Name</th>
                <th className="w-[30%] py-3 text-center">Email</th>
                <th className="w-[15%] py-3 text-center">Contact</th>
                <th className="w-[10%] py-3 text-center">City</th>
                <th className="w-[15%] py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-b border-slate-800">
                  <td className="py-4 flex justify-center">
                    <img
                      src={
                        user.profilePic ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center break-all">{user.email}</td>
                  <td className="text-center">{user.contact}</td>
                  <td className="text-center">{user.address?.city || "-"}</td>
                  {/* <td>
                   */}
                  <td className="text-center">
                    <div className="flex justify-center flex-col lg:flex-row gap-2">
                      <button
                        onClick={() =>
                          setSelectedUser({
                            profile: user.profilePic,
                            name: user.name,
                            email: user.email,
                            contact: user.contact,
                            city: user.address?.city,
                            state: user.address?.state,
                            pincode: user.address?.pincode,
                            address: user.address?.house,
                          })
                        }
                        className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm text-white">
                        👁 View
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm text-white">
                        
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default Users;
