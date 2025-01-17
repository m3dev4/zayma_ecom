"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavCon = () => {
  return (
    <ul className="felx gap-4 justify-between items-center">
      <div className="px-4">
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="font-poppins text-white focus:whitespace-normal rounded-full bg-neutral-800">
              Se connecter
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </ul>
  );
};

export default NavCon;
