type Props = {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
    isActive?: boolean;
};
export default function Button({ children, onClick, disabled, isActive }: Props) {
	return (
		<button onClick={onClick} className={`p-2 text-aqua-900 font-bold text-xl shadow-strong-clickable ${isActive ? "text-background bg-aqua-900":""}`} disabled={disabled}>
			{children}
		</button>
	);
}
