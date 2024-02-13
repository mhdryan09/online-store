import UsersAdminView from "@/components/views/admin/Users";
import usersServices from "@/services/user";
import React, { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await usersServices.getAllUsers();
      setUsers(data.data);
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <UsersAdminView users={users} />
    </div>
  );
};

export default AdminUsersPage;
