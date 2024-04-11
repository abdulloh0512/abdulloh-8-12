import { Control } from 'react-hook-form'

import { FormControl, FormField as FormFieldUI, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormFieldProps {
	control: Control<any>
	name: string
	label: string
	placeholder: string
	type: 'email' | 'text' | 'number' | 'password'
}

export const FormField: React.FC<FormFieldProps> = ({ control, name, label, placeholder, type }) => {
	return (
		<FormFieldUI
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className='font-light'>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

