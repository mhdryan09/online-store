import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// fungsi untuk mengambil semua data dari collection pada firebase
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// fungsi untuk mengambil data berdasarkan id
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // sudah ada data?
  if (data.length > 0) {
    callback(false);
  } else {
    // jika role belum ada, set jadi member
    if (!userData.role) {
      userData.role = "member";
    }

    // hash password user
    userData.password = await bcrypt.hash(userData.password, 10);

    // masukan data ke firebase
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        console.log(error);
      });
  }

  return data;
}

export async function signIn(email: string) {
  // ambil semua data dari collection berdasarkan email
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // jika ada data
  if (data) {
    return data[0]; // kembalikan data pertama
  } else {
    return null;
  }
}
