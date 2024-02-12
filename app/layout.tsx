import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'

export const fontRoboto = League_Spartan({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-roboto',
})

import { cn } from '@/lib/utils'

import { InvoiceSheet } from '@/components/invoice-sheet/invoice-sheet'
import { SheetProvider } from '@/context/sheet-context'
import { AuthProvider } from '@/context/auth-context'

export const metadata: Metadata = {
	title: 'CRUD with MUI',
	description: 'Simple crud app with Material UI',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<link
				rel='icon'
				href='/favicon.png'
				sizes='any'
			/>
			<body
				className={cn(
					'bg-background font-sans antialiased text-primary min-h-screen flex flex-col px-6 sm:px-12 md:ml-20 md:px-6',
					fontRoboto.variable
				)}>
				<AuthProvider>
					<SheetProvider>
						{children}
						<InvoiceSheet />
					</SheetProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
