import instance from "@/lib/axios/instance";

export const usersServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),
};

export default usersServices;
