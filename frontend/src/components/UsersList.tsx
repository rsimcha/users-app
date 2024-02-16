import { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseUrl";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import deleteUserIcon from "../icons/delete-user.svg";
import Button from "@mui/material/Button";
import editUserIcon from "../icons/edit-user.svg";
import { User } from "../types/user";
import CreateUser from "./CreateUser";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const fetchUsers = async (page: number): Promise<User[]> => {
    try {
      const data = await fetchWithAuth(
        `${BASE_URL}/api/users/getUsers/${page}`
      );
      setUsers(data);
      return data;
    } catch (error) {
      console.error("Error fetching users: ", error);
      return [];
    }
  };

  useEffect(() => {
    const page = 1;
    fetchUsers(page);
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await fetchWithAuth(`${BASE_URL}/api/users/deleteUser/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
      console.log(`User ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete user: ", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ justifyContent: "center" }}>Users List</h1>

      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New User
      </Button>
      <CreateUser isOpen={isDialogOpen} onClose={handleCloseDialog} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {users?.map((user: User) => (
          <div
            key={user.id}
            style={{ width: "30%", margin: "10px", textAlign: "center" }}
          >
            <p>
              <img
                style={{
                  cursor: "pointer",
                  marginRight: "20px",
                  width: "20px",
                  height: "20px",
                }}
                onClick={() => deleteUser(user.id)}
                alt=""
                src={deleteUserIcon}
              />
              <strong>
                {user.first_name} {user.last_name}
              </strong>
              <img
                alt=""
                style={{
                  marginLeft: "20px",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                src={editUserIcon}
              />
            </p>
            <p>{user.email}</p>
            <img
              style={{ width: "100%", maxWidth: "300px" }}
              alt=""
              key={user.avatar}
              src={user.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
