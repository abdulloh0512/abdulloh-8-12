import Link from "next/link";
import { format } from "date-fns";

import { ChevronRightIcon } from "@radix-ui/react-icons";

import { InvoiceItemBadge } from "../../../../components/invoice-item-badge/invoice-item-badge";

import { Timestamp } from "firebase/firestore";
import { InvoiceDataType, InvoiceType } from "@/types/types";

interface InvoiceListItemProps {
  id: string;
  date: Timestamp | Date;
  name: string;
  data: InvoiceDataType[];
  status: InvoiceType["status"];
}

export const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  id,
  date,
  name,
  data,
  status,
}) => {
  const price = data.reduce((acc, curr) => acc + Number(curr.price), 0);
  const formattedDate = format((date as Timestamp)["toDate"](), "dd MMM yyyy");

  return (
    <li className="bg-foreground rounded-lg border border-background hover:border-accent">
      <Link
        href="#"
        className="flex flex-row items-center justify-between py-4 px-8">
        <div className="flex flex-row gap-14 items-center">
          <p className="font-normal">
            <span className="text-secondary">#</span>
            {id}
          </p>
          <p className="font-normal text-secondary text-sm">{formattedDate}</p>
          <p className="font-normal text-primary text-sm">{name}</p>
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-row gap-10 items-center">
            <p className="text-lg font-normal">Є {price.toFixed(2)}</p>
            <div className="flex flex-row gap-4 items-center">
              <InvoiceItemBadge status={status} />
            </div>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-accent my-4 ml-4" />
        </div>
      </Link>
    </li>
  );
};
