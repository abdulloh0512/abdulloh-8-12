'use client'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '../theme-switcher/theme-switcher'
import { UserIcon } from '../user-icon/user-icon'

export const Navbar = () => {
	return (
		<nav className='fixed top-0 left-0 w-full bg-foreground flex flex-row justify-between md:flex-col md:w-20 md:min-h-screen md:rounded-r-2xl'>
			<div className='bg-accent w-20 md:w-full aspect-square rounded-r-2xl'>
				<Link
					href='/'
					className='h-full w-full grid items-center'>
					<img
						src='/logo.svg'
						className='w-8 h-8 mx-auto'
					/>
				</Link>
			</div>
			<div className='flex flex-row items-center pr-6 gap-8 md:w-full md:pb-6 md:pr-0 md:flex-col '>
				<ThemeSwitcher />
				<Separator
					orientation='vertical'
					className='block md:hidden'
				/>
				<Separator className='hidden md:block' />
				<UserIcon />
			</div>
		</nav>
	)
}
