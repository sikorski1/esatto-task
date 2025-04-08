import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export type FunFact = {
	fact: string;
};

export const fetchFunFact = async (): Promise<FunFact[]> => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/funfact`);
		return response.data;
	} catch (error) {
		console.error("Error fetching funfact:", error);
		throw new Error("Failed to fetch funfact data");
	}
};

export const useFunFact = () => {
	return useQuery({
		queryKey: ["funfact"],
		queryFn: fetchFunFact,
	});
};
