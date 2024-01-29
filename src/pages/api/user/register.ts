import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // cek method? jika POST
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      // cek status
      if (status) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "Sign Up Success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Sign Up Failed",
        });
      }
    });
  }
  // request method tidak sesuai
  else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }
}
