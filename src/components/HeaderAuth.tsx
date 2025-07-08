"use client";
import { useSession } from "next-auth/react";
import UserImage from "./UserImage";
import GuestActions from "./GuestActions";

export default function HeaderAuth() {
  const session = useSession();

  if (session.status === "loading") {
    return null;
  }

  return session?.data?.user ? <UserImage /> : <GuestActions />;
}
