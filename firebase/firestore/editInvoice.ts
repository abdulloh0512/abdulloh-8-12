import { firebase_app } from '../config'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import { InvoiceType } from '@/types/types'

const db = getFirestore(firebase_app)

export default async function editInvoice(data: InvoiceType) {
	const invoiceRef = doc(db, 'invoices', data.id)

	let result = null
	let error = null

	try {
		result = await setDoc(invoiceRef, data, {
			merge: true,
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}

