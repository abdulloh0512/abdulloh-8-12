'use client'

import { firebase_app } from '@/firebase/config'
import { getAuth, signOut } from 'firebase/auth'

import { Button } from '@/components/ui/button'

const auth = getAuth(firebase_app)

export default function Profile() {
	return (
		<>
			<main className='max-w-screen-md mx-auto grid items-center flex-1'>
				<Button
					className='w-fit mx-auto'
					onClick={() => signOut(auth)}>
					Logout
				</Button>
			</main>
		</>
	)
}
