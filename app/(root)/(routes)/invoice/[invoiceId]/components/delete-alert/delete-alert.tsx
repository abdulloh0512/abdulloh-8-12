import { Dispatch, SetStateAction, useContext } from 'react'

import { AuthContext } from '@/context/auth-context'

import deleteInvoice from '@/firebase/firestore/deleteInvoice'

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface DeleteAlertProps {
	invoiceId: string
	isAlertOpen: boolean
	setIsAlertOpen: Dispatch<SetStateAction<boolean>>
}

export const DeleteAlert: React.FC<DeleteAlertProps> = ({ isAlertOpen, setIsAlertOpen, invoiceId }) => {
	const router = useRouter()
	const { fetchInvoices } = useContext(AuthContext)

	const handleDeleteInvoice = (invoiceId: string) => {
		deleteInvoice(invoiceId)
		setIsAlertOpen(false)
		fetchInvoices()
		router.push('/')
	}

	return (
		<AlertDialog
			open={isAlertOpen}
			onOpenChange={setIsAlertOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete invoice #{invoiceId.slice(0, 6)}? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='gap-4'>
					<Button
						variant='secondary'
						onClick={() => setIsAlertOpen(false)}>
						Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={() => handleDeleteInvoice(invoiceId)}>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
