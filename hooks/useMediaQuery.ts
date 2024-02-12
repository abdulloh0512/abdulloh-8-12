import { useState, useEffect } from 'react'

function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia(query)

		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		mediaQuery.addEventListener('change', handleChange)
		setMatches(mediaQuery.matches)

		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [query])

	return matches
}

export default useMediaQuery
