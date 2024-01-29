import { Input } from "@/components/ui/input";

interface FormTableListInput {
  type: "text" | "number";
  onChange: (value: number | string) => void;
}

export const FormTableListInput: React.FC<FormTableListInput> = ({
  type,
  onChange,
}) => {
  return (
    <Input
      type={type}
      placeholder=""
      min={type === "number" ? 0 : undefined}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};
