/**
 * Reusable FormInput component for consistent styling of labels and inputs with optional icons.
 * Supports both input and textarea elements (controlled via the `as` prop).
 */

const FormInput = ({
	id,
	label,
	type = "text",
	value,
	onChange,
	placeholder,
	Icon,
	required = false,
	className = "",
	as = "input",
}) => {
	const InputComponent = as === "textarea" ? "textarea" : "input";

	const baseClasses =
		"w-full rounded-2xl transition-all duration-150 focus:ring-primary focus:border-primary";

	const inputClasses =
		as === "textarea"
			? `textarea textarea-bordered h-32 text-base ${baseClasses}`
			: `input input-bordered input-lg ${baseClasses}`;

	return (
		<div className={`w-full ${className}`}>
		<label className={`form-control w-full ${className}`} htmlFor={id}>
			{/* Label with icon and required marker */}
			<div className="label pb-1">
				<span className="label-text font-semibold text-base flex items-center text-base-content">
					{Icon && <Icon className="size-4 mr-2 text-primary" />}
					{label}
					{required && <span className="text-error ml-1">*</span>}
				</span>
			</div>

			{/* Input or Textarea */}
			<InputComponent
				id={id}
				name={id}
				type={as === "textarea" ? undefined : type}
				value={value}
				onChange={onChange}
				className={inputClasses}
				placeholder={placeholder}
				required={required}
			/>
		</label>
		</div>
	);
};

export default FormInput;
