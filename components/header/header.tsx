import clsx from 'clsx'

interface HeaderProps {
	children: React.ReactNode
	className?: string
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
	return (
		<header className={clsx('mt-16 max-w-screen-md w-full mx-auto flex justify-between pt-36 md:pt-0', className)}>
			{children}
		</header>
	)
}

