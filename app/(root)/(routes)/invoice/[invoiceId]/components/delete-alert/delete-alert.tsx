import { Dispatch, SetStateAction } from 'react'

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteAlertProps {
	invoiceId: string
	isAlertOpen: boolean
	setIsAlertOpen: Dispatch<SetStateAction<boolean>>
}

export const DeleteAlert: React.FC<DeleteAlertProps> = ({ isAlertOpen, setIsAlertOpen, invoiceId }) => {
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
				<AlertDialogFooter>
					<Button
						variant='secondary'
						onClick={() => setIsAlertOpen(false)}>
						Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={() => console.log('del')}>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
