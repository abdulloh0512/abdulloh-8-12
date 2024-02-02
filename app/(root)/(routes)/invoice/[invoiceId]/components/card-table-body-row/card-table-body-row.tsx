import { TableCell, TableRow } from "@/components/ui/table";

import { InvoiceDataType } from "@/types/types";

interface CardTableBodyRowProps {
  data: InvoiceDataType;
}

export const CardTableBodyRow: React.FC<CardTableBodyRowProps> = ({ data }) => {
  return (
    <TableRow>
      <TableCell className="pr-2 w-full">
        <p className="font-normal text-secondary text-sm">{data.itemName}</p>
      </TableCell>
      <TableCell className="px-2 min-w-20">
        <p className="font-normal text-secondary text-sm">{data.qty}</p>
      </TableCell>
      <TableCell className="px-2 min-w-28">
        <p className="font-normal text-secondary text-sm">
          Є {Number(data.price).toFixed(2)}
        </p>
      </TableCell>
      <TableCell className="px-2">
        Є {(data.qty * data.price).toFixed(2)}
      </TableCell>
    </TableRow>
  );
};
