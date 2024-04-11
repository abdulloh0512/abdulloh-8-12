'use client'

import { redirect } from 'next/navigation'
import { useContext } from 'react'

import { AuthContext } from '@/context/auth-context'

import { Navbar } from '@/components/navbar/navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { currentUser } = useContext(AuthContext)

	if (!currentUser) {
		redirect('/auth')
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

