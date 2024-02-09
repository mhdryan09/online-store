import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  // jika data nya sudah ada di database
  if (data.length > 0) {
    callback(false); // mengembalikan false karena email sudah terdaftar / tidak akan bisa lakukan register
  } else {
    // jika role belum ada, set jadi member
    if (!userData.role) {
      userData.role = "member";
    }
    // hash password user
    userData.password = await bcrypt.hash(userData.password, 10);
    // menambahkan attribute created_at dan updated_at
    userData.created_at = new Date();
    userData.updated_at = new Date();

    addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  // jika ada data
  if (data) {
    return data[0]; // kembalikan data pertama
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: { email: string; role?: string },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);

  // jika ada user
  if (user.length > 0) {
    callback(user[0]); // kembalikan user yang ditemukan
  } else {
    data.role = "member";

    await addData("users", data, (result: boolean) => {
      if (result) {
        callback(data); // kembalikan data user yang baru ditambah
      }
    });
  }
}
