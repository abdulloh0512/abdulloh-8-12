'use client'

import { firebase_app } from '@/firebase/config'
import { getAuth, signOut } from 'firebase/auth'

import { Navbar } from '@/components/navbar/navbar'
import { Button } from '@/components/ui/button'

const auth = getAuth(firebase_app)

export default function Profile() {
	return (
		<>
			<Navbar />
			<main className='max-w-screen-md mx-auto min-h-screen grid items-center'>
				<Button
					className='w-fit mx-auto'
					onClick={() => signOut(auth)}>
					Logout
				</Button>
			</main>
		</>
	)
}
