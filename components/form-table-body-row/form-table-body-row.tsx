import { useState } from "react";

import { TrashIcon } from "@radix-ui/react-icons";

import { TableCell, TableRow } from "@/components/ui/table";
import { FormTableListInput } from "../form-table-list-input/form-table-list-input";
import { Button } from "../ui/button";

import { InvoiceDataType } from "@/types/types";

interface FormTableBodyRowProps {
  data: InvoiceDataType;
  onChange: (newData: InvoiceDataType) => void;
  onDelete: () => void;
}

export const FormTableBodyRow: React.FC<FormTableBodyRowProps> = ({
  data,
  onChange,
  onDelete,
}) => {
  const [qty, setQty] = useState<number>(data.qty);
  const [price, setPrice] = useState<number>(data.price);

  const handleItemNameChange = (value: string | number) => {
    onChange({ ...data, itemName: value as string });
  };

  const handleQtyChange = (value: string | number) => {
    setQty(value as number);
    onChange({ ...data, qty: value as number });
  };

  const handlePriceChange = (value: string | number) => {
    setPrice(value as number);
    onChange({ ...data, price: value as number });
  };

  return (
    <TableRow>
      <TableCell className="pr-2 w-full">
        <FormTableListInput type="text" onChange={handleItemNameChange} />
      </TableCell>
      <TableCell className="px-2 min-w-20">
        <FormTableListInput type="number" onChange={handleQtyChange} />
      </TableCell>
      <TableCell className="px-2 min-w-28">
        <FormTableListInput type="number" onChange={handlePriceChange} />
      </TableCell>
      <TableCell className="px-2">{(qty * price).toFixed(2)}</TableCell>
      <TableCell className="pl-2 w-0">
        <Button variant="outline" size="icon" onClick={onDelete}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
