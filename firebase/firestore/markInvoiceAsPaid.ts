import { firebase_app } from '../config'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function markInvoiceAsPaid(id: string) {
	const invoiceRef = doc(db, 'invoices', id)

	let result = null
	let error = null

	try {
		result = await updateDoc(invoiceRef, {
			status: 'paid',
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}
