'use client'
import { useAuthStoreUser } from "@/stores/auth-store"

export default function Profile() {

    const user = useAuthStoreUser()

    return (
        <div className="flex gap-2 items-center mt-10">
            <div className="size-12 bg-amber-500 rounded-full">
                <img className="size-full object-cover" src="/user-avatar.png" alt="" />
            </div>
            <div className="flex flex-col">
                <h2>{user?.email}</h2>
                <p className="text-xs text-text-A/50">{user?.role}</p>
            </div>
        </div>
    )
}
