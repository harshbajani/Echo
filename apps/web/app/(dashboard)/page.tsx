"use client";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";

export default function Page() {
  const addUser = useMutation(api.users.add);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <h1 className="text-2xl font-bold">Hello World web app </h1>
        <UserButton />
        <OrganizationSwitcher hidePersonal={true} />
        <Button onClick={() => addUser()}>Add</Button>
      </div>
    </>
  );
}
