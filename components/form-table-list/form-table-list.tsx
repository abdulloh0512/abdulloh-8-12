import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { FormTableBodyRow } from '../form-table-body-row/form-table-body-row'
import { Button } from '../ui/button'

import { InvoiceDataType } from '@/types/types'

interface FormTableListProps {
	tableData: InvoiceDataType[]
	setTableData: Dispatch<SetStateAction<InvoiceDataType[]>>
}

export const FormTableList: React.FC<FormTableListProps> = ({ tableData, setTableData }) => {
	const handleAddRow = () => {
		setTableData((prevData: InvoiceDataType[]) => [...prevData, { id: uuidv4(), itemName: '', qty: 0, price: 0 }])
	}

	const handleRowChange = (id: string, newData: InvoiceDataType) => {
		setTableData((prevData: InvoiceDataType[]) => {
			const updatedData = prevData.map(row => (row.id === id ? { ...row, ...newData } : row))
			return updatedData
		})
	}

	const handleDeleteRow = (id: string) => {
		setTableData((prevData: InvoiceDataType[]) => prevData.filter(row => row.id !== id))
	}

	return (
		<>
			<Table className='border-separate border-spacing-y-4'>
				<TableCaption>Item List</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Item Name</TableHead>
						<TableHead>Qty.</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Total</TableHead>
						<TableHead className='text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData.map(rowData => (
						<FormTableBodyRow
							key={rowData.id}
							data={rowData}
							onChange={(newData: InvoiceDataType) => handleRowChange(rowData.id, newData)}
							onDelete={() => handleDeleteRow(rowData.id)}
						/>
					))}
				</TableBody>
			</Table>
			<Button
				variant='secondary'
				type='button'
				className='rounded-full w-full mt-2'
				aria-label='Add new item to a list'
				onClick={handleAddRow}>
				+ Add New Item
			</Button>
		</>
	)
}

