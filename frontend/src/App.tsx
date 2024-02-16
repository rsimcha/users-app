import React, { useEffect } from "react";
import "./App.css";
import { login } from "./api/login";
import UsersList from "./components/UsersList";

export default function App() {
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="App">
      <UsersList></UsersList>
    </div>
  );
}
