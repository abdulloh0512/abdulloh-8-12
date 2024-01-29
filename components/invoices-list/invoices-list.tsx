import { InvoiceListItem } from "../invoice-list-item/invoice-list-item";

export const InvoicesList = () => {
  return (
    <ul className="mt-16 flex flex-col gap-4">
      <InvoiceListItem status="draft" />
      <InvoiceListItem status="pending" />
      <InvoiceListItem status="paid" />
      <InvoiceListItem status="overdue" />
    </ul>
  );
};
