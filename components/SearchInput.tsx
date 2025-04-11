import { useEffect, useState } from "react";

type Props = {
	onSearch: (value: string) => void;
	initialValue?: string;
};

const DEBOUNCE_DELAY = 500;
export default function SearchInput({ onSearch, initialValue = "" }: Props) {
	const [inputValue, setInputValue] = useState(initialValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch(inputValue);
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(handler);
	}, [inputValue, onSearch]);

	return (
		<input
			type="text"
			placeholder="Search by name..."
			value={inputValue}
			onChange={e => setInputValue(e.target.value)}
			className="px-4 py-2 text-lg border rounded-md shadow-strong w-full sm:w-auto mb-4 sm:mb-0"
		/>
	);
}
