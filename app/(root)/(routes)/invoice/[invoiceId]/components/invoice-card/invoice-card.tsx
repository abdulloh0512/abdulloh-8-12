import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@/context/auth-context'

import getUserInfo from '@/firebase/firestore/getUserInfo'

import { formattedDate } from '@/utils/formattedDate'

import { InvoiceType, UserDataType } from '@/types/types'
import { Timestamp } from 'firebase/firestore'
import { InvoiceCardTable } from '../invoice-card-table/invoice-card-table'

interface InvoiceCardProps {
	data: InvoiceType
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ data }) => {
	const { currentUser } = useContext(AuthContext)

	const [userData, setUserData] = useState<UserDataType>({
		name: '',
		street: '',
		city: '',
		'post-code': '',
		country: '',
	})

	useEffect(() => {
		const fetchUserData = async () => {
			if (currentUser) {
				const userInfo = await getUserInfo(currentUser.uid)
				setUserData(userInfo.result?.data() as UserDataType)
			}
		}
		fetchUserData()
	}, [currentUser])

	const calculateTotal = (data: InvoiceType) => {
		const total = data.data.reduce((acc, currentItem) => {
			return acc + currentItem.price * currentItem.qty
		}, 0)

		return total
	}

	return (
		<div className='flex flex-col p-6 bg-foreground mt-6 mb-32 border border-background rounded-lg sm:mb-0 sm:p-8 md:p-12'>
			<div className='flex flex-col justify-between gap-2 sm:flex-row'>
				<div className='flex flex-col'>
					<p className='font-normal'>
						<span className='text-secondary'>#</span>
						{data.id.slice(0, 6)}
					</p>
					<p className='font-normal text-secondary text-sm sm:mt-3'>{data.project}</p>
				</div>
				<div className='flex flex-col my-7 sm:text-right sm:my-0'>
					<p className='font-normal text-secondary text-sm'>{userData.street}</p>
					<p className='font-normal text-secondary text-sm'>{userData.city}</p>
					<p className='font-normal text-secondary text-sm'>{userData['post-code']}</p>
					<p className='font-normal text-secondary text-sm'>{userData.country}</p>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 '>
				<div>
					<p className='font-normal text-secondary text-sm'>Invoice Date</p>
					<p className='font-normal mt-3'>{formattedDate(data.date as Timestamp)}</p>
				</div>
				<div>
					<p className='font-normal text-secondary text-sm'>Bill To</p>
					<p className='font-normal mt-3'>{data.name}</p>
				</div>
				<div className='order-last mt-8 sm:order-none sm:mt-0'>
					<p className='font-normal text-secondary text-sm'>Sent To</p>
					<p className='font-normal mt-3'>{data.email}</p>
				</div>
				<div className='self-end'>
					<p className='font-normal text-secondary text-sm'>Payment Due</p>
					<p className='font-normal mt-3'>{formattedDate(data.paymentDate as Timestamp)}</p>
				</div>
				<div>
					<p className='font-normal text-secondary text-sm'>{data.address}</p>
					<p className='font-normal text-secondary text-sm'>{data.city}</p>
					<p className='font-normal text-secondary text-sm'>{data.code}</p>
					<p className='font-normal text-secondary text-sm'>{data.country}</p>
				</div>
			</div>
			<div>
				<InvoiceCardTable data={data.data} />
				<div className='bg-background w-full flex flex-row justify-between items-center gap-2 p-6 rounded-b-lg sm:p-8'>
					<p className='font-normal text-secondary text-sm'>Amount Due</p>
					<p className='font-bold text-2xl'>Є {calculateTotal(data).toFixed(2)}</p>
				</div>
			</div>
		</div>
	)
}
