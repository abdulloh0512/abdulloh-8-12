'use client'

import * as z from 'zod'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { AuthContext } from '@/context/auth-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { addDays } from 'date-fns'

import { cn } from '@/lib/utils'
import addInvoice from '@/firebase/firestore/addInvoice'

import { CalendarIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormField as FormFieldComponent } from '../form-field/form-field'
import { FormTableList } from '../form-table-list/form-table-list'

import { generateInvoiceID } from '@/utils/generateInvoiceID'

import { InvoiceType } from '@/types/types'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({ message: 'Invalid email address.' }),
	address: z.string().min(2, {
		message: 'Address must be at least 2 characters.',
	}),
	city: z.string().min(2, {
		message: 'City must be at least 2 characters.',
	}),
	code: z.string().min(2, {
		message: 'Code must be at least 2 characters.',
	}),
	country: z.string().min(2, {
		message: 'Country must be at least 2 characters.',
	}),
	date: z.date({
		required_error: 'A date is required.',
	}),
	net: z.string().min(1, {
		message: 'Please select payment term.',
	}),
	project: z.string().min(2, {
		message: 'Description must be at least 2 characters.',
	}),
})

interface NewInvoiceFormProps {
	handleSheet: Dispatch<SetStateAction<boolean>>
}

export const NewInvoiceForm: React.FC<NewInvoiceFormProps> = ({ handleSheet }) => {
	const { currentUser, fetchInvoices } = useContext(AuthContext)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			address: '',
			city: '',
			code: '',
			country: '',
			date: new Date(),
			net: '',
			project: '',
		},
	})

	const [tableData, setTableData] = useState([{ id: uuidv4(), itemName: '', qty: 0, price: 0 }])

	async function onSubmit(values: z.infer<typeof formSchema>, status: InvoiceType['status']) {
		const isValid = await form.trigger()

		if (isValid) {
			let invoiceData: InvoiceType = {
				...values,
				id: generateInvoiceID(),
				userId: currentUser?.uid || '',
				data: tableData,
				status,
				paymentDate: addDays(new Date(values.date), Number(values.net)),
			}

			try {
				const { error } = await addInvoice(invoiceData.id, invoiceData)

				if (error) {
					return console.log(error)
				}

				handleSheet(false)
				fetchInvoices()
			} catch (e) {
				console.log(e)
			}
		}
	}

	return (
		<Form {...form}>
			<form className='space-y-4'>
				<FormFieldComponent
					control={form.control}
					name='name'
					label="Client's Name"
					placeholder="Client's Name"
					type='text'
				/>
				<FormFieldComponent
					control={form.control}
					name='email'
					label="Client's Email"
					placeholder="Client's Email"
					type='email'
				/>
				<FormFieldComponent
					control={form.control}
					name='address'
					label="Client's Address"
					placeholder="Client's Address"
					type='text'
				/>

				<div className='flex flex-row gap-4'>
					<FormFieldComponent
						control={form.control}
						name='city'
						label='City'
						placeholder='City'
						type='text'
					/>
					<FormFieldComponent
						control={form.control}
						name='code'
						label='Post Code'
						placeholder='Post Code'
						type='text'
					/>
					<FormFieldComponent
						control={form.control}
						name='country'
						label='Country'
						placeholder='Country'
						type='text'
					/>
				</div>

				<div className='flex flex-row gap-4 pt-4'>
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='font-light'>Invoice Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'secondary'}
												className={cn(
													'rounded-md w-full pl-3 text-left font-normal px-3 py-2',
													!field.value && 'text-muted-foreground'
												)}>
												{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={date => date > new Date() || date < new Date('1900-01-01')}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='net'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='font-light'>Payment Terms</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='bg-foreground w-full hover:bg-background'>
											<SelectValue placeholder='Select terms' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='7'>Net 7 Days</SelectItem>
										<SelectItem value='14'>Net 14 Days</SelectItem>
										<SelectItem value='30'>Net 30 Days</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormFieldComponent
					control={form.control}
					name='project'
					label='Project Description'
					placeholder='Project Description'
					type='text'
				/>

				<div>
					<FormTableList
						tableData={tableData}
						setTableData={setTableData}
					/>
				</div>

				<div className='flex flex-row justify-between'>
					<Button
						variant='cancel'
						type='button'
						onClick={() => handleSheet(false)}>
						Discard
					</Button>
					<div className='flex flex-row justify-end gap-2'>
						<Button
							variant='secondary'
							type='button'
							onClick={() => onSubmit(form.getValues(), 'draft')}>
							Save as Draft
						</Button>
						<Button
							type='button'
							onClick={() => onSubmit(form.getValues(), 'pending')}>
							Save & Send
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
