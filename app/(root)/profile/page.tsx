"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

import firebase_app from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import getUserInfo from "@/firebase/firestore/getUserInfo";

import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";

const auth = getAuth(firebase_app);

export default async function Profile() {
  // const { user } = useContext(AuthContext);

  // if (user) {
  //   const { result } = await getUserInfo("usersInfo", user.uid);
  //   const data = result?.data();
  // }

  return (
    <>
      <Navbar />
      <main className="max-w-screen-md mx-auto">
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </main>
    </>
  );
}
