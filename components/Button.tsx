type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isActive?: boolean;
	type?: "button" | "submit" | "reset";
	colors?: string;
};
export default function Button({ children, onClick, disabled, isActive, type, colors }: Props) {
	return (
		<button
			onClick={onClick}
			className={`p-2 flex items-center justify-center text-aqua-900 font-bold text-xl shadow-strong-clickable cursor-pointer ${
				isActive ? "text-background bg-aqua-900" : ""
			} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${colors}`}
			type={type || "button"}
			disabled={disabled}>
			{children}
		</button>
	);
}
