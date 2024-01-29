import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const HeaderSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] border-0 text-primary">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="overdue">Overdue</SelectItem>
      </SelectContent>
    </Select>
  );
};
