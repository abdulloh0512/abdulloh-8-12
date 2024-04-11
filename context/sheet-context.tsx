'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SheetContextProps {
	isSheetOpen: boolean
	setIsSheetOpen: Dispatch<SetStateAction<boolean>>
	editingInvoiceId: string
	setEditingInvoiceId: Dispatch<SetStateAction<string>>
	handleSheet: () => void
}

export const SheetContext = createContext<SheetContextProps>({
	isSheetOpen: false,
	setIsSheetOpen: () => {},
	editingInvoiceId: '',
	setEditingInvoiceId: () => {},
	handleSheet: () => {},
})

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [editingInvoiceId, setEditingInvoiceId] = useState('')

	const handleSheet = () => {
		if (isSheetOpen) {
			setIsSheetOpen(false)
			setEditingInvoiceId('')
		}
	}

	return (
		<SheetContext.Provider value={{ isSheetOpen, setIsSheetOpen, editingInvoiceId, setEditingInvoiceId, handleSheet }}>
			{children}
		</SheetContext.Provider>
	)
}

