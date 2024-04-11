'use client'

import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '@/context/auth-context'
import { SheetContext } from '@/context/sheet-context'

import getUserInfo from '@/firebase/firestore/getUserInfo'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { InvoiceForm } from '../invoice-form/invoice-form'
import { FormInfo } from '../form-info/form-info'

import { UserDataType } from '@/types/types'

export const InvoiceSheet = () => {
	const { isSheetOpen, handleSheet, editingInvoiceId } = useContext(SheetContext)
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
			onOpenChange={handleSheet}>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>{editingInvoiceId ? 'Edit Invoice' : 'New Invoice'}</SheetTitle>
				</SheetHeader>

				<div className='mt-8 flex flex-col gap-4 mx-1'>
					<p className='text-sm text-accent'>Bill From</p>
					<FormInfo
						heading='Street Address'
						text={userData.street}
					/>
					<div className='flex flex-col gap-4 sm:flex-row'>
						<div className='flex flex-row gap-4 basis-2/3'>
							<FormInfo
								heading='City'
								text={userData.city}
							/>
							<FormInfo
								heading='Post Code'
								text={userData['post-code']}
							/>
						</div>
						<div className='basis-1/3'>
							<FormInfo
								heading='Country'
								text={userData.country}
							/>
						</div>
					</div>
				</div>

				<div className='mt-8 flex flex-col gap-4'>
					<p className='text-sm text-accent'>Bill To</p>
					<InvoiceForm handleSheet={handleSheet} />
				</div>
			</SheetContent>
		</Sheet>
	)
}

