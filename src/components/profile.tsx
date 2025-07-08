"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const sessions = useSession();

  if (sessions.data?.user) {
    return (
      <div>
        <h1>{sessions.data.user.name}</h1>
        <p>{sessions.data.user.email}</p>
      </div>
    );
  }

  return <div>No user information available</div>;
}
