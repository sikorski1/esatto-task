import { IToy } from "@/models/toy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type ToysResponse = {
    toys: IToy[]
};

export const fetchToys = async (page: number): Promise<ToysResponse> => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/toy/?page=${page}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching toys:", error);
		throw new Error("Failed to fetch toys data");
	}
};

export const useGetToys = (page: number) => {
	return useQuery<ToysResponse, Error>({
		queryKey: ["toys", page],
		queryFn: () => fetchToys(page),
	});
};
