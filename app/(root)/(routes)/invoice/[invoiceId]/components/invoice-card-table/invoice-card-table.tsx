import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { InvoiceDataType } from '@/types/types'
import { CardTableBodyRow } from '../card-table-body-row/card-table-body-row'

interface InvoiceCardTableProps {
	data: InvoiceDataType[]
}

export const InvoiceCardTable: React.FC<InvoiceCardTableProps> = ({ data }) => {
	return (
		<>
			<Table className='bg-secondary/5 p-8 mt-11 border-0 rounded-t-lg border-separate border-spacing-y-4'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Item Name</TableHead>
						<TableHead>QTY.</TableHead>
						<TableHead>Price</TableHead>
						<TableHead className='text-right'>Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map(rowData => (
						<CardTableBodyRow
							key={rowData.id}
							data={rowData}
						/>
					))}
				</TableBody>
			</Table>
		</>
	)
}
