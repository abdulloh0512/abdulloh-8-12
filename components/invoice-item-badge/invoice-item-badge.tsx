import clsx from 'clsx'

import { Badge } from '@/components/ui/badge'

import { InvoiceType } from '@/types/types'

interface InvoiceItemBadgeProps {
	status: InvoiceType['status']
}

export const InvoiceItemBadge: React.FC<InvoiceItemBadgeProps> = ({ status }) => {
	return (
		<Badge variant={status as Exclude<InvoiceType['status'], 'total'>}>
			<span
				className={clsx('h-2 w-2 rounded-full mr-2', {
					'bg-primary': status === 'draft',
					'bg-paid': status === 'paid',
					'bg-pending': status === 'pending',
					'bg-alert': status === 'overdue',
				})}></span>
			<p className='relative top-[1px] '>{status}</p>
		</Badge>
	)
}

