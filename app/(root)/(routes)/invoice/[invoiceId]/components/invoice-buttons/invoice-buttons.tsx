import { useRouter } from 'next/navigation'

import markInvoiceAsPaid from '@/firebase/firestore/markInvoiceAsPaid'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { InvoiceType } from '@/types/types'
import { Dispatch, SetStateAction } from 'react'

interface InvoiceButtonsProps {
	currentInvoice: InvoiceType
	setIsAlertOpen: Dispatch<SetStateAction<boolean>>
	setIsSheetOpen: Dispatch<SetStateAction<boolean>>
	setEditingInvoiceId: Dispatch<SetStateAction<string>>
	fetchInvoices: () => void
	className?: string
}

export const InvoiceButtons: React.FC<InvoiceButtonsProps> = ({
	currentInvoice,
	fetchInvoices,
	setIsAlertOpen,
	setIsSheetOpen,
	setEditingInvoiceId,
	className,
}) => {
	const router = useRouter()

	const handleInvoicePayment = (invoiceId: string) => {
		markInvoiceAsPaid(invoiceId)
		fetchInvoices()
		router.push('/')
	}

	const handleInvoiceEdit = (invoiceId: string) => {
		setEditingInvoiceId(invoiceId)
		setIsSheetOpen(true)
	}

	return (
		<div className={cn(' flex-row gap-2', className)}>
			<Button
				variant='secondary'
				onClick={() => handleInvoiceEdit(currentInvoice.id)}
				disabled={currentInvoice.status === 'paid' || currentInvoice.status === 'pending' ? true : false}>
				Edit
			</Button>
			<Button
				variant='destructive'
				onClick={() => setIsAlertOpen(true)}>
				Delete
			</Button>
			<Button
				onClick={() => handleInvoicePayment(currentInvoice.id)}
				disabled={currentInvoice.status === 'paid' || currentInvoice.status === 'draft' ? true : false}>
				Mark as Paid
			</Button>
		</div>
	)
}

