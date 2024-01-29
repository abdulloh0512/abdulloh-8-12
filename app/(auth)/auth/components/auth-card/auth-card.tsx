"use client";

import { useState } from "react";

import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";
import addUserInfo from "@/firebase/firestore/addUserInfo";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "../login-form/login-form";
import { RegisterForm } from "../register-form/register-form";

export const AuthCard = () => {
  const [tab, setTab] = useState("login");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const handleLogin = async (formValues: {
    email: string;
    password: string;
  }) => {
    try {
      const { result, error } = await signIn(
        formValues.email,
        formValues.password
      );

      if (error) {
        return console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (formValues: {
    name: string;
    email: string;
    password: string;
    "repeat-password": string;
    street: string;
    city: string;
    "post-code": string;
    country: string;
  }) => {
    try {
      const { result, error } = await signUp(
        formValues.email,
        formValues.password
      );

      if (result) {
        const data = {
          name: formValues.name,
          street: formValues.street,
          city: formValues.city,
          "post-code": formValues["post-code"],
          country: formValues.country,
        };

        const { error } = await addUserInfo("usersInfo", result.user.uid, data);

        if (error) {
          return console.log(error);
        }
      }

      if (error) {
        return console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs
      value={tab}
      onValueChange={onTabChange}
      className="w-[400px] min-h-screen flex flex-col items-center justify-center mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value={tab === "login" ? "login" : "register"}>
        <Card>
          <CardHeader>
            <CardTitle>{tab === "login" ? "Login" : "Register"}</CardTitle>
            <CardDescription>
              {tab === "login"
                ? "Please enter your registered email address and password to access your account."
                : "Sign up by providing your email, password and other required information to create your account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tab === "login" ? (
              <LoginForm handleLogin={handleLogin} />
            ) : (
              <RegisterForm handleRegister={handleRegister} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
