'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SheetContextProps {
	isSheetOpen: boolean
	setIsSheetOpen: Dispatch<SetStateAction<boolean>>
	editingInvoiceId: string
	setEditingInvoiceId: Dispatch<SetStateAction<string>>
}

export const SheetContext = createContext<SheetContextProps>({
	isSheetOpen: false,
	setIsSheetOpen: () => {},
	editingInvoiceId: '',
	setEditingInvoiceId: () => {},
})

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [editingInvoiceId, setEditingInvoiceId] = useState('')

	return (
		<SheetContext.Provider value={{ isSheetOpen, setIsSheetOpen, editingInvoiceId, setEditingInvoiceId }}>
			{children}
		</SheetContext.Provider>
	)
}
