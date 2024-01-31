import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceType } from "@/types/types";

interface InvoiceSelectProps {
  onSelect: (status: InvoiceType["status"]) => void;
}

export const InvoiceSelect: React.FC<InvoiceSelectProps> = ({ onSelect }) => {
  return (
    <Select onValueChange={(status: InvoiceType["status"]) => onSelect(status)}>
      <SelectTrigger className="w-[150px] border-0 text-primary">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="total">Total</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="overdue">Overdue</SelectItem>
      </SelectContent>
    </Select>
  );
};
