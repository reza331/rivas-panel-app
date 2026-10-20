
'use client'

import { useAuthStoreUser } from "@/stores/auth-store";

export default function Home() {

  const user = useAuthStoreUser()

  if (!user) return null

  return (
    <div className="size-full flex items-center justify-center">
      This is home page
    </div>
  );
}
