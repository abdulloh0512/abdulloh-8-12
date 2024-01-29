"use client";

import { useContext } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { SheetContext } from "@/context/sheet-context";

import { HeaderSelect } from "@/components/header-select/header-select";
import { HeaderButton } from "@/components/header-button/header-button";
import { InvoicesList } from "@/components/invoices-list/invoices-list";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  const { setIsSheetOpen } = useContext(SheetContext);

  return (
    <>
      <Navbar />
      <header className="mt-16 max-w-screen-md mx-auto flex items-center justify-between">
        <div className="font-bold flex flex-col gap-4">
          <h1 className="text-4xl">Invoices</h1>
          <p className="text-primary/60 font-normal text-sm">
            There are 0 total invoices
          </p>
        </div>
        <div className="flex items-center gap-4">
          <HeaderSelect />
          <HeaderButton
            size="withIcon"
            variant="default"
            text="New Invoice"
            onClick={() => setIsSheetOpen(true)}
            icon={<PlusCircledIcon className="h-6 w-6" />}
          />
        </div>
      </header>
      <main className="max-w-screen-md mx-auto">
        <InvoicesList />
      </main>
    </>
  );
}
