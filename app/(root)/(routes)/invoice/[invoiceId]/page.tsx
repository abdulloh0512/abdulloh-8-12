'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { AuthContext } from '@/context/auth-context'
import { SheetContext } from '@/context/sheet-context'

import { ChevronLeftIcon } from '@radix-ui/react-icons'

import { Header } from '@/components/header/header'
import { Main } from '@/components/main/main'
import { InvoiceItemBadge } from '@/components/invoice-item-badge/invoice-item-badge'
import { Button } from '@/components/ui/button'
import { InvoiceCard } from './components/invoice-card/invoice-card'

import { InvoiceType } from '@/types/types'
import { DeleteAlert } from './components/delete-alert/delete-alert'
import markInvoiceAsPaid from '@/firebase/firestore/markInvoiceAsPaid'

export default function Invoice({ params }: { params: { invoiceId: string } }) {
	const { invoices, fetchInvoices } = useContext(AuthContext)
	const currentInvoice = invoices.find(invoice => invoice.id === params.invoiceId)

	if (!currentInvoice) return

	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const { setIsSheetOpen } = useContext(SheetContext)
	const router = useRouter()

	const handleInvoicePayment = (invoiceId: string) => {
		markInvoiceAsPaid(invoiceId)
		fetchInvoices()
		router.push('/')
	}

	return (
		<>
			<Header className='flex-col w-full items-start'>
				<Link
					href='/'
					className='flex flex-row gap-6 items-center'>
					<ChevronLeftIcon className='h-4 w-4 text-accent' />
					<p className='relative top-[1px]'>Go back</p>
				</Link>
				<div className='flex flex-row justify-between items-center w-full mt-6 py-5 px-8 bg-foreground border border-background rounded-lg'>
					<div className='flex flex-row gap-6 items-center'>
						<p className='font-normal text-secondary text-sm'>Status</p>
						<InvoiceItemBadge status={currentInvoice?.status as Exclude<InvoiceType['status'], 'total'>} />
					</div>
					<div className='flex flex-row gap-2'>
						<Button
							variant='secondary'
							onClick={() => console.log('edit')}
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
				</div>
			</Header>
			<Main>
				<InvoiceCard data={currentInvoice} />
				<DeleteAlert
					isAlertOpen={isAlertOpen}
					setIsAlertOpen={setIsAlertOpen}
					invoiceId={currentInvoice.id}
				/>
			</Main>
		</>
	)
}
