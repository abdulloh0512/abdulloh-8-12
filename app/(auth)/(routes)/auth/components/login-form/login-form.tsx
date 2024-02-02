"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/form-field/form-field";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 character.",
  }),
});

interface LoginFormProps {
  handleLogin: (formValues: z.infer<typeof formSchema>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleLogin(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col">
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

        <Button type="submit" className="ml-auto">
          Login
        </Button>
      </form>
    </Form>
  );
};
