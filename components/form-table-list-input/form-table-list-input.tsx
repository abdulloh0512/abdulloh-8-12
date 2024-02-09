import { Input } from '@/components/ui/input'

interface FormTableListInput {
	type: 'text' | 'number'
	onChange: (value: number | string) => void
	value: string | number
}

export const FormTableListInput: React.FC<FormTableListInput> = ({ type, onChange, value }) => {
	return (
		<Input
			type={type}
			placeholder=''
			min={type === 'number' ? 0 : undefined}
			onChange={e => onChange(e.target.value)}
			value={value}
			required
		/>
	)
}
