
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/form-field/form-field";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  "repeat-password": z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  "post-code": z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
});

interface RegisterFormProps {
  handleRegister: (formValues: z.infer<typeof formSchema>) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  handleRegister,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      "repeat-password": "",
      street: "",
      city: "",
      "post-code": "",
      country: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleRegister(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col">
        <FormField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Name"
          type="text"
        />
        <FormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="email@address.com"
          type="email"
        />
        <FormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <FormField
          control={form.control}
          name="repeat-password"
          label="Repeat Password"
          placeholder="Password"
          type="password"
        />
        <FormField
          control={form.control}
          name="street"
          label="Street Address"
          placeholder="Street Address"
          type="text"
        />
        <FormField
          control={form.control}
          name="city"
          label="City"
          placeholder="City"
          type="text"
        />
        <FormField
          control={form.control}
          name="post-code"
          label="Post Code"
          placeholder="Post Code"
          type="text"
        />
        <FormField
          control={form.control}
          name="country"
          label="Country"
          placeholder="Country"
          type="text"
        />

        <Button type="submit" className="ml-auto">
          Register
        </Button>
      </form>
    </Form>
  );
};
