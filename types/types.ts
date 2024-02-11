import { Timestamp } from 'firebase/firestore'

export type InvoiceDataType = {
	id: string
	itemName: string
	qty: number
	price: number
}

export type InvoiceType = {
	id: string
	userId: string
	name: string
	email: string
	address: string
	city: string
	code: string
	country: string
	date: Timestamp | Date
	paymentDate: Timestamp | Date
	net: string
	project: string
	data: InvoiceDataType[]
	status: 'total' | 'draft' | 'paid' | 'pending' | 'overdue'
}

export type UserDataType = {
	name: string
	street: string
	city: string
	'post-code': string
	country: string
}
