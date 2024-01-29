export type InvoiceDataType = {
  id: string;
  itemName: string;
  qty: number;
  price: number;
};

export type InvoiceType = {
  name: string;
  email: string;
  address: string;
  city: string;
  code: string;
  country: string;
  date: Date;
  paymentDate: Date;
  net: string;
  project: string;
  data: InvoiceDataType[];
  status: "draft" | "paid" | "pending" | "overdue";
};
