interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type?: string;
}

export default function Input({
	id,
	onChange,
	value,
	label,
	type,
}: InputProps) {
	return (
		<div>
			<input
				className='border'
				id={id}
				value={value}
				type={type}
				onChange={onChange}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
}
