type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isActive?: boolean;
	type?: "button" | "submit" | "reset";
};
export default function Button({ children, onClick, disabled, isActive, type }: Props) {
	return (
		<button
            
			onClick={onClick}
			className={`p-2 text-aqua-900 font-bold text-xl shadow-strong-clickable ${
				isActive ? "text-background bg-aqua-900" : ""
			} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
			type={type || "button"}
			disabled={disabled}>
			{children}
		</button>
	);
}
