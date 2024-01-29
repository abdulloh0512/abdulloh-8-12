"use client";

import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/auth-context";
import { SheetContext } from "@/context/sheet-context";

import getUserInfo from "@/firebase/firestore/getUserInfo";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NewInvoiceForm } from "../new-invoice-form/new-invoice-form";
import { FormInfo } from "../form-info/form-info";

export const InvoiceSheet = () => {
  const { isSheetOpen, setIsSheetOpen } = useContext(SheetContext);
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      const { result } = await getUserInfo("usersInfo", user.uid);
      const data = result?.data();
      setUserData(data);
    }
  }, [user]);

  console.log(userData);

  // if (user) {
  //   const { result } = getUserInfo("usersInfo", user.uid);
  //   const data = result?.data();
  //   console.log(data);
  // }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>New Invoice</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          <p className="text-sm text-accent">Bill From</p>
          <FormInfo heading="Street Address" text="Street Address" />
          <div className="flex flex-row gap-4">
            <FormInfo heading="City" text="City" />
            <FormInfo heading="Post Code" text="Post Code" />
            <FormInfo heading="Country" text="Country" />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <p className="text-sm text-accent">Bill To</p>
          <NewInvoiceForm handleSheet={setIsSheetOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
