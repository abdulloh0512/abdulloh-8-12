import { firebase_app } from '../config'
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function markInvoiceAsPaid(id: string) {
	// const invoiceRef = db.collection('invoices').doc(id)
	const invoiceRef = doc(db, 'invoices', id)

	let result = null
	let error = null

	try {
		// result = await deleteDoc(doc(db, 'invoices', id))
		result = await updateDoc(invoiceRef, {
			status: 'paid',
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}
