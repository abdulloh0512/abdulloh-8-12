'use client'

import { useContext, useState } from 'react'

import { PlusCircledIcon } from '@radix-ui/react-icons'

import { SheetContext } from '@/context/sheet-context'
import { AuthContext } from '@/context/auth-context'

import { InvoicesList } from '@/app/(root)/(routes)/components/invoices-list/invoices-list'
import { Header } from '@/components/header/header'
import { Main } from '@/components/main/main'
import { Button } from '@/components/ui/button'
import { InvoiceSelect } from './components/invoice-select/invoice-select'
import { EmptyState } from './components/empty-state/empty-state'

import { InvoiceType } from '@/types/types'

export default function Home() {
	const { setIsSheetOpen } = useContext(SheetContext)
	const { invoices } = useContext(AuthContext)

	const [status, setStatus] = useState<InvoiceType['status']>('total')
	const [currentInvoices, setCurrentInvoices] = useState<number>(0)

	return (
		<>
			<Header className='items-center'>
				<div className='font-bold flex flex-col gap-4'>
					<h1 className='text-2xl sm:text-4xl'>Invoices</h1>
					<p className='text-primary font-normal text-sm'>
						{invoices.length > 0 ? (
							<span className='hidden md:inline'>{`There ${currentInvoices === 1 ? 'is' : 'are'} `}</span>
						) : null}
						{`${currentInvoices || '0'} ${status} invoice${currentInvoices !== 1 ? 's' : ''}`}
					</p>
				</div>
				<div className='flex items-center gap-2 sm:gap-4'>
					<InvoiceSelect onSelect={setStatus} />
					<Button
						size='withIcon'
						variant='default'
						onClick={() => setIsSheetOpen(true)}
						className='flex flex-row justify-between gap-2'>
						<PlusCircledIcon className='h-6 w-6' />
						New <span className='hidden md:block'>Invoice</span>
					</Button>
				</div>
			</Header>
			<Main>
				{invoices.length > 0 ? (
					<InvoicesList
						invoices={invoices}
						status={status}
						setCurrentInvoices={setCurrentInvoices}
					/>
				) : (
					<EmptyState />
				)}
			</Main>
		</>
	)
}

