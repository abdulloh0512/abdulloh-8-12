import { InvoiceItemBadge } from "../invoice-item-badge/invoice-item-badge";

import { InvoiceType } from "@/types/types";

interface InvoiceListItemProps {
  status: InvoiceType["status"];
}

export const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ status }) => {
  return (
    <li className="flex flex-row items-center justify-between bg-foreground py-4 px-8 rounded-lg">
      <p className="font-normal">
        <span className="text-primary/60">#</span>RT3080
      </p>
      <p className="font-normal text-primary/60 text-sm">Due 19 Aug 2021</p>
      <p className="font-normal text-primary/60 text-sm">Jensen Huang</p>
      <p className="text-lg font-normal">Є1,800.90</p>
      <div className="flex flex-row gap-4 items-center">
        <InvoiceItemBadge status={status} />
      </div>
    </li>
  );
};
