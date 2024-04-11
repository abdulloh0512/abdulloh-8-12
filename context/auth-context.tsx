'use client'

import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import { firebase_app } from '@/firebase/config'
import getAllInvoices from '@/firebase/firestore/getAllInvoices'

import { InvoiceType } from '@/types/types'

const auth = getAuth(firebase_app)

interface AuthContextProps {
	currentUser: User | null
	setCurrentUser: Dispatch<SetStateAction<User | null>>
	invoices: InvoiceType[]
	fetchInvoices: () => void
}

export const AuthContext = createContext<AuthContextProps>({
	currentUser: null,
	setCurrentUser: () => {},
	invoices: [],
	fetchInvoices: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [invoices, setInvoices] = useState<InvoiceType[]>([])

	const fetchInvoices = async () => {
		if (currentUser) {
			try {
				const { result, error } = await getAllInvoices(currentUser.uid)
				const data = result as InvoiceType[]

				if (error) {
					console.error('Error fetching invoices:', error)
					return
				}

				if (data) {
					setInvoices(data)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setCurrentUser(user)
			} else {
				setCurrentUser(null)
			}
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {
		fetchInvoices()
	}, [currentUser])

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser, invoices, fetchInvoices }}>
			{children}
		</AuthContext.Provider>
	)
}

