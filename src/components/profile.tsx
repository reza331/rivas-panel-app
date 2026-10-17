export default function Profile() {
    return (
        <div className="flex gap-2 items-center mt-10">
            <div className="size-12 bg-amber-500 rounded-full">
                <img className="size-full object-cover" src="/user-avatar.png" alt="" />
            </div>
            <div className="flex flex-col">
                <h2>Reza Reihani</h2>
                <p className="text-xs text-text-A/50">Super Admin</p>
            </div>
        </div>
    )
}
