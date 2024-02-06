'use client'

import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import { redirect } from 'next/navigation'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const { currentUser } = useContext(AuthContext)

	if (currentUser) {
		redirect('/')
	}

	return <>{children}</>
}
