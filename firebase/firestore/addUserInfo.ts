import { firebase_app } from '../config'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import { UserDataType } from '@/types/types'

const db = getFirestore(firebase_app)

export default async function addUserInfo(id: string, data: UserDataType) {
	let result = null
	let error = null

	try {
		result = await setDoc(doc(db, 'usersInfo', id), data, {
			merge: true,
		})
	} catch (e) {
		error = e
	}

	return { result, error }
}
