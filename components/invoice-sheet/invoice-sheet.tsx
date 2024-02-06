'use client'

import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@/context/auth-context'
import { SheetContext } from '@/context/sheet-context'

import getUserInfo from '@/firebase/firestore/getUserInfo'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NewInvoiceForm } from '../new-invoice-form/new-invoice-form'
import { FormInfo } from '../form-info/form-info'

import { UserDataType } from '@/types/types'

export const InvoiceSheet = () => {
	const { isSheetOpen, setIsSheetOpen } = useContext(SheetContext)
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

	return (
		<Sheet
			open={isSheetOpen}
			onOpenChange={setIsSheetOpen}>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>New Invoice</SheetTitle>
				</SheetHeader>

				<div className='mt-8 flex flex-col gap-4 mx-1'>
					<p className='text-sm text-accent'>Bill From</p>
					<FormInfo
						heading='Street Address'
						text={userData.street}
					/>
					<div className='flex flex-row gap-4'>
						<FormInfo
							heading='City'
							text={userData.city}
						/>
						<FormInfo
							heading='Post Code'
							text={userData['post-code']}
						/>
						<FormInfo
							heading='Country'
							text={userData.country}
						/>
					</div>
				</div>

				<div className='mt-8 flex flex-col gap-4'>
					<p className='text-sm text-accent'>Bill To</p>
					<NewInvoiceForm handleSheet={setIsSheetOpen} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
