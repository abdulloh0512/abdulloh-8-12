import Image from "next/image";

export const EmptyState = () => {
  return (
    <div className="text-center max-w-sm mx-auto">
      <Image
        src="/illustration-empty.svg"
        width={300}
        height={300}
        alt=""
        aria-label="No invoices"
        className="mx-auto mt-20"
        priority
      />
      <p className="font-bold mt-10 mb-5 text-2xl">There is nothing here</p>
      <p className="mx-auto text-balance">
        Create an invoice by clicking the <strong>New Invoice</strong> button
        and get started
      </p>
    </div>
  );
};
