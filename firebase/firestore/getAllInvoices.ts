import firebase_app from "../config";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getAllInvoices(userId: string) {
  let result = null;
  let error = null;

  try {
    const invoicesCollection = collection(db, "invoices");
    const userInvoicesQuery = query(
      invoicesCollection,
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(userInvoicesQuery);
    result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
