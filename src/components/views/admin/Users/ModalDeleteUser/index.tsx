import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import usersServices from "@/services/user";
import React from "react";
import styles from "./ModalDeleteUser.module.scss";
import { useSession } from "next-auth/react";

const ModalDeleteUser = ({
  deletedUser,
  setDeletedUser,
  setUsersData,
}: any) => {
  const session: any = useSession();

  const handleDelete = async () => {
    usersServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    // refetch data
    const { data } = await usersServices.getAllUsers();
    setUsersData(data.data);
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
