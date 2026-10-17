'use client'
import ThemeControl from './theme-control'
import Profile from './profile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBar() {

    const pathname = usePathname()

    return (
        <div className='h-full w-70 bg-B shadow-sm p-5'>
            <div className='flex justify-between items-center'>
                <div className='font-bold text-lg'>Rivas Admin Panel</div>
                <ThemeControl />
            </div>
            <Profile />
            <ul className='text-sm flex-col flex mt-10 gap-2'>
                <Link href={'/'}><li className={`hover:bg-text-A/20 rounded-xl px-3 py-2 cursor-pointer ${pathname === '/' ? 'bg-hover-effect' : ''}`}>Home</li></Link>
                <Link href={'/products'}><li className={`hover:bg-text-A/20 rounded-xl px-3 py-2 cursor-pointer ${pathname === '/products' ? 'bg-hover-effect' : ''}`}>Products</li></Link>
                <Link href={'/'}><li className={`hover:bg-text-A/20 rounded-xl px-3 py-2 cursor-pointer ${pathname === '/users' ? 'bg-hover-effect' : ''}`}>Users</li></Link>
                <Link href={'/'}><li className={`hover:bg-text-A/20 rounded-xl px-3 py-2 cursor-pointer ${pathname === '/settings' ? 'bg-hover-effect' : ''}`}>Settings</li></Link>
            </ul>
        </div>
    )
}
