import { firebase_app } from '../config'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function getUserInfo(id: string) {
	let docRef = doc(db, 'usersInfo', id)

	let result = null
	let error = null

	try {
		result = await getDoc(docRef)
	} catch (e) {
		error = e
	}

	return { result, error }
}
