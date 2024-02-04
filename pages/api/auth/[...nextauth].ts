import NextAuth, { AuthOptions } from 'next-auth'
// import Providers from "next-auth/providers"
import CredentialsProvider from 'next-auth/providers/credentials'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import signIn from '@/firebase/auth/signin'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/src/lib/firebase';

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(/* your config */)
// ).firestore()

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'text',
					placeholder: 'your-email@example.com',
				},
				password: {
					label: 'password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Invalid credentials')
				}

				const user = await signIn(credentials.email, credentials.password)

				if (!user) {
					throw new Error('Invalid credentials')
				}

				return user
				// return null
			},
		}),
	],

	// session: {
	// 	strategy: 'jwt',
	// },
	// pages: {
	// 	signIn: '/auth',
	// },
	// secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
