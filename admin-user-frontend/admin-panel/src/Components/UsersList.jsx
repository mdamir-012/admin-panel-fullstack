import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [usersData, setUsersData] = useState([]);
  const [tgl, setTgl] = useState(false);

  const token = localStorage.getItem("user_token");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://admin-backend-deploy-gozo.onrender.com/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Success:", result);
      setUsersData(result.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await fetch(
        `https://admin-backend-deploy-gozo.onrender.com/users/delete/${userId}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("Success:", result.user);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBlock = async (userId, currentBlockStatus) => {
    console.log(userId);

    try {
      const response = await fetch(
        `https://admin-backend-deploy-gozo.onrender.com/users/block/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ block: !currentBlockStatus }),
        }
      );

      const result = await response.json();
      console.log("Success:", result);
      // setTgl(true);
      setUsersData(
        usersData.map((user) =>
          user._id === userId ? { ...user, block: !currentBlockStatus } : user
        )
      );

      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <div>
        {usersData?.map((elem, i) => (
          <div
            key={elem._id}
            className="border rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-bold">{i + 1}</p>
              <p>Name: {elem.name}</p>
              <p>Email: {elem.email}</p>
            </div>
            <div className="flex">
              <button
                onClick={() => handleDelete(elem._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
              >
                Delete
              </button>
              <button
                onClick={() => handleBlock(elem._id, elem.block)}
                className={`${
                  tgl ? "bg-green-500" : "bg-yellow-500"
                } text-white px-4 py-2 rounded-lg`}
              >
                {tgl ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;

