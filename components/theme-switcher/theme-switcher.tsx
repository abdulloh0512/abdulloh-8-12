import { useEffect, useState } from 'react'

import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { Button } from '../ui/button'

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

	const handleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [theme])

	return (
		<Button
			variant='ghost'
			size='sm'
			onClick={handleTheme}
			aria-label='Change theme'>
			{theme === 'dark' ? <SunIcon className='h-4 w-4' /> : <MoonIcon className='h-4 w-4' />}
		</Button>
	)
}
