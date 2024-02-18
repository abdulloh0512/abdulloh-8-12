import { useEffect } from 'react'

import { InvoiceListItem } from '../invoice-list-item/invoice-list-item'

import { InvoiceType } from '@/types/types'

interface InvoicesListProps {
	invoices: InvoiceType[]
	status: InvoiceType['status']
	setCurrentInvoices: (value: number) => void
}

export const InvoicesList: React.FC<InvoicesListProps> = ({ invoices, status, setCurrentInvoices }) => {
	const filteredInvoices = (status: InvoiceType['status']) => {
		return status === 'total' ? invoices : invoices.filter(invoice => invoice.status === status)
	}

	useEffect(() => {
		setCurrentInvoices(filteredInvoices(status).length)
	}, [filteredInvoices])

	return (
		<ul className='my-16 flex flex-col gap-4'>
			{filteredInvoices(status).map(invoice => (
				<InvoiceListItem
					key={invoice.id}
					id={invoice.id}
					name={invoice.name}
					data={invoice.data}
					status={invoice.status}
					date={invoice.date}
				/>
			))}
		</ul>
	)
}
