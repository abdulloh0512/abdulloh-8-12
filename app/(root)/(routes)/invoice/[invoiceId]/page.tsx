'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'

import { AuthContext } from '@/context/auth-context'
import { SheetContext } from '@/context/sheet-context'

import { ChevronLeftIcon } from '@radix-ui/react-icons'

import { Header } from '@/components/header/header'
import { Main } from '@/components/main/main'
import { InvoiceItemBadge } from '@/components/invoice-item-badge/invoice-item-badge'
import { InvoiceCard } from './components/invoice-card/invoice-card'
import { DeleteAlert } from './components/delete-alert/delete-alert'

import { InvoiceType } from '@/types/types'
import { InvoiceButtons } from './components/invoice-buttons/invoice-buttons'

export default function Invoice({ params }: { params: { invoiceId: string } }) {
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const { setIsSheetOpen, setEditingInvoiceId } = useContext(SheetContext)
	const { invoices, fetchInvoices } = useContext(AuthContext)
	const currentInvoice = invoices.find(invoice => invoice.id === params.invoiceId)

	if (!currentInvoice) return

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
					<div className='flex flex-row gap-6 items-center justify-between w-full sm:w-fit'>
						<p className='font-normal text-secondary text-sm'>Status</p>
						<InvoiceItemBadge status={currentInvoice?.status as Exclude<InvoiceType['status'], 'total'>} />
					</div>
					<InvoiceButtons
						className='hidden sm:flex'
						currentInvoice={currentInvoice}
						fetchInvoices={fetchInvoices}
						setIsAlertOpen={setIsAlertOpen}
						setIsSheetOpen={setIsSheetOpen}
						setEditingInvoiceId={setEditingInvoiceId}
					/>
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
			<footer className='fixed bottom-0 left-0 right-0 w-full bg-foreground p-6 sm:hidden'>
				<InvoiceButtons
					className='flex justify-around sm:hidden'
					currentInvoice={currentInvoice}
					fetchInvoices={fetchInvoices}
					setIsAlertOpen={setIsAlertOpen}
					setIsSheetOpen={setIsSheetOpen}
					setEditingInvoiceId={setEditingInvoiceId}
				/>
			</footer>
		</>
	)
}

