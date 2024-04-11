import Link from 'next/link'
import { Timestamp } from 'firebase/firestore'

import { formattedDate } from '@/utils/formattedDate'

import { ChevronRightIcon } from '@radix-ui/react-icons'

import { InvoiceItemBadge } from '@/components/invoice-item-badge/invoice-item-badge'

import { InvoiceDataType, InvoiceType } from '@/types/types'

interface InvoiceListItemProps {
	id: string
	date: Timestamp | Date
	name: string
	data: InvoiceDataType[]
	status: InvoiceType['status']
}

export const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ id, date, name, data, status }) => {
	const price = data.reduce((acc, curr) => acc + Number(curr.price), 0)

	return (
		<li className='bg-foreground rounded-lg border border-background hover:border-accent'>
			<Link
				href={`/invoice/${id}`}
				className='flex flex-row justify-between p-8 sm:items-center sm:py-4'>
				<div className='hidden flex-row gap-14 items-center sm:flex'>
					<p className='font-normal'>
						<span className='text-secondary'>#</span>
						{id.slice(0, 6)}
					</p>
					<p className='font-normal text-secondary text-sm'>{formattedDate(date as Timestamp)}</p>
					<p className='font-normal text-secondary text-sm'>{name}</p>
				</div>

				<div className='hidden flex-row items-center sm:flex'>
					<div className='flex flex-row gap-10 items-center'>
						<p className='text-lg font-normal'>Є {price.toFixed(2)}</p>
						<div className='flex flex-row gap-4 items-center'>
							<InvoiceItemBadge status={status} />
						</div>
					</div>
					<ChevronRightIcon className='h-4 w-4 text-accent my-4 ml-4 hidden md:block' />
				</div>

				<div className='flex flex-col sm:hidden'>
					<p className='font-normal mb-6'>
						<span className='text-secondary'>#</span>
						{id.slice(0, 6)}
					</p>
					<p className='font-normal text-secondary text-sm mb-2'>{formattedDate(date as Timestamp)}</p>
					<p className='text-lg font-normal'>Є {price.toFixed(2)}</p>
				</div>

				<div className='flex flex-col justify-between sm:hidden'>
					<p className='font-normal text-primary text-sm'>{name}</p>
					<InvoiceItemBadge status={status} />
				</div>
			</Link>
		</li>
	)
}

