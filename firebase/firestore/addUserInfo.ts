import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addUserInfo(
  collection: string,
  id: string,
  data: {
    name: string;
    street: string;
    city: string;
    "post-code": string;
    country: string;
  }
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
