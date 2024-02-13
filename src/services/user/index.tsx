import instance from "@/lib/axios/instance";

export const usersServices = {
  getAllUsers: () => instance.get("/api/user"),
};

export default usersServices;
