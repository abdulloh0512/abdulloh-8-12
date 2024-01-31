"use client";

import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import getAllInvoices from "@/firebase/firestore/getAllInvoices";

import { InvoiceType } from "@/types/types";

const auth = getAuth(firebase_app);

interface AuthContextProps {
  user: User | null;
  invoices: InvoiceType[];
  fetchInvoices: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  invoices: [],
  fetchInvoices: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);

  const fetchInvoices = async () => {
    if (user) {
      try {
        const { result, error } = await getAllInvoices(user.uid);
        const data = result as InvoiceType[];

        if (error) {
          console.error("Error fetching invoices:", error);
          return;
        }

        if (data) {
          setInvoices(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, invoices, fetchInvoices }}>
      {children}
    </AuthContext.Provider>
  );
};
