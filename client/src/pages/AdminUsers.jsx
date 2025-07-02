import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
export const AdminUsers = () => {
  const [users, setusers] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllusersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("All users data: ", data);
      setusers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllusersData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users after delete:  ${data}`);

      if (response.ok) {
        getAllusersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="admin-users-section">
        <div className="flex flex-center">
          <h1>Users Data </h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteUser(curUser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
