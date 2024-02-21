import instance from "@/lib/axios/instance";

export const usersServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
};

export default usersServices;
