import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { User } from "../types/user";
import { ChangeEvent, useState } from "react";
import { BASE_URL } from "../api/baseUrl";
import { fetchWithAuth } from "../utils/fetchWithAuth";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUser(props: CreateUserProps) {
  const { isOpen, onClose } = props;

  const [newUser, setNewUser] = useState<User>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const fieldNames: (keyof User)[] = [
    "email",
    "first_name",
    "last_name",
    "avatar",
  ];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetchWithAuth(`${BASE_URL}/api/users/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      onClose();
    } catch (error) {
      console.error("Failed to create user: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        {fieldNames.map((fieldName) => (
          <TextField
            key={fieldName}
            label={fieldName.replace("_", " ").toUpperCase()}
            name={fieldName}
            value={newUser[fieldName]}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: "15px", marginTop: "10px" }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
