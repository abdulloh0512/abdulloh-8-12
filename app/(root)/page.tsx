"use client";

import { useContext, useState } from "react";

import { PlusCircledIcon } from "@radix-ui/react-icons";

import { SheetContext } from "@/context/sheet-context";
import { AuthContext } from "@/context/auth-context";

import { InvoiceSelect } from "@/components/invoice-select/invoice-select";
import { InvoicesList } from "@/app/(root)/components/invoices-list/invoices-list";
import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./components/empty-state/empty-state";

import { InvoiceType } from "@/types/types";

export default function Home() {
  const { setIsSheetOpen } = useContext(SheetContext);
  const { invoices } = useContext(AuthContext);

  const [status, setStatus] = useState<InvoiceType["status"]>("total");
  const [currentInvoices, setCurrentInvoices] = useState<number>(0);

  return (
    <>
      <Navbar />
      <header className="mt-16 max-w-screen-md mx-auto flex items-center justify-between">
        <div className="font-bold flex flex-col gap-4">
          <h1 className="text-4xl">Invoices</h1>
          <p className="text-primary font-normal text-sm">
            {invoices.length > 0
              ? `There ${
                  ((currentInvoices > 1 || currentInvoices === 0) && "are") ||
                  (currentInvoices === 1 && "is")
                } ${
                  (currentInvoices === 0 && "no") ||
                  currentInvoices ||
                  invoices.length
                } ${status} invoices`
              : "No invoices"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <InvoiceSelect onSelect={setStatus} />
          <Button
            size="withIcon"
            variant="default"
            onClick={() => setIsSheetOpen(true)}
            className="flex flex-row justify-between gap-2">
            <PlusCircledIcon className="h-6 w-6" />
            New Invoice
          </Button>
        </div>
      </header>
      <main className="max-w-screen-md mx-auto">
        {invoices.length > 0 ? (
          <InvoicesList
            invoices={invoices}
            status={status}
            setCurrentInvoices={setCurrentInvoices}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}
