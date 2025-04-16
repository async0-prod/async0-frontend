"use client";

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

export default function Login() {
  return (
    <Button onClick={() => signIn()}>
      <LogIn size="16" className="mr-2" />
      Login
    </Button>
  );
}
