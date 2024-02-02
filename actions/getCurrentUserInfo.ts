import getUserInfo from "@/firebase/firestore/getUserInfo";

import { UserDataType } from "@/types/types";

export async function getCurrentUserInfo(id: string) {
  try {
    const { result } = await getUserInfo(id);
    return result?.data() as UserDataType;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
