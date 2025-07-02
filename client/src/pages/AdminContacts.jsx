import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contact, setContact] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("All contacts data: ", data);
      setContact(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`contacts after delete:  ${data}`);

      if (response.ok) {
        toast.success("Contact deleted successfully");
        getAllContactsData();
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllContactsData();
  }, []);
  return (
    <>
      <section className="admin-contacts-section flex-center">
        <h1 className="flex flex-center"> Messages From Users</h1>
      </section>
      <div className="admin-users flex flex-center">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((curContact, index) => {
              return (
                <tr key={curContact._id || index}>
                  <td>{curContact.username}</td>
                  <td>{curContact.email}</td>
                  <td>{curContact.message}</td>
                  <td>
                    <button onClick={() => deleteContact(curContact._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
