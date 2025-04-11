import FunFact from "./FunFact";
export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto relative p-12 flex flex-col items-center justify-center gap-4">
			<FunFact />
			<p className="text-sm text-aqua-900">&copy; {currentYear} Esatto Task</p>
		</footer>
	);
}
