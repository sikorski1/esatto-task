"use client"
import { useFunFact } from "@/hooks/useFunFact";
export default function FunFact() {
	const { data, error, isLoading, refetch } = useFunFact();
    console.log(data);
	return (
		<div className="p-4 bg-yellow-100 rounded-xl shadow-md text-center max-w-xl mx-auto mt-10">
			{isLoading && <p>Loading a fun fact...</p>}
			{error && <p>Oops! {error.message}</p>}
			{data && <p>{data[0].fact}</p>}

			<button onClick={() => refetch()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
				New Fun Fact
			</button>
		</div>
	);
}
