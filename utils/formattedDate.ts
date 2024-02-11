import { format } from 'date-fns'

import { Timestamp } from 'firebase/firestore'

export function formattedDate(date: Timestamp) {
	return format(date['toDate'](), 'dd MMM yyyy')
}
