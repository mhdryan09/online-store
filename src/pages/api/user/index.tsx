import { retrieveData } from "@/lib/firebase/service";
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
  }
}
