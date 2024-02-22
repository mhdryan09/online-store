import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // connect database
    const users = await retrieveData("users");
    // set delete password user
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    // set response api
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Get User Success",
      data: data,
    });
  } else if (req.method === "PUT") {
    const { id, data } = req.body; // get id and data from request body

    // update data
    await updateData("users", id, data, (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "Update User Success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Update User Failed",
        });
      }
    });
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    // jalankan delete data dari service firebase
    await deleteData("users", user[1], (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "Delete User Success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Delete User Failed",
        });
      }
    });
  }
}
