import { firebase_app } from '../config'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import { InvoiceType } from '@/types/types'

const db = getFirestore(firebase_app)

export default async function addInvoice(id: string, data: InvoiceType) {
	let result = null
	let error = null

	try {
		result = await setDoc(doc(db, 'invoices', id), data, {
			merge: true,
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}
