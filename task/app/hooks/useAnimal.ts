import { ICat } from "@/models/cat";
import { IDog } from "@/models/dog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AnimalResponse = {
	currentPage: number;
	totalPages: number;
	totalAnimals: number;
	limit: number;
	hasNextPage: boolean;
	animals: IDog[] | ICat[];
};

export const fetchAnimals = async (
	page: number,
	sortBy: string,
	order: string,
	search: string
): Promise<AnimalResponse> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/animal?page=${page}&sortBy=${sortBy}&order=${order}&search=${search}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching animals:", error);
		throw new Error("Failed to fetch animals data");
	}
};

export const postAnimal = async ({ data }: { data: IDog | ICat }): Promise<AnimalResponse> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/animal`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error creating animal:", error);
		throw new Error("Failed to create animal data");
	}
};

export const updateAnimal = async ({ data }: { data: IDog | ICat }): Promise<AnimalResponse> => {
	try {
		const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/animal/${data._id}`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error updating animal:", error);
		throw new Error("Failed to update animal data");
	}
};

export const deleteAnimal = async ({ id }: { id: string }): Promise<AnimalResponse> => {
	try {
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/animal/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting animal:", error);
		throw new Error("Failed to delete animal data");
	}
};

export const useGetAnimals = (page: number, sortBy: string, order: string, search: string) => {
	return useQuery<AnimalResponse, Error>({
		queryKey: ["animals", page, sortBy, order, search],
		queryFn: () => fetchAnimals(page, sortBy, order, search),
	});
};

export const usePostAnimal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postAnimal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["animals"] });
		},
	});
};

export const useUpdateAnimal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAnimal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["animals"] });
		},
	});
};

export const useDeleteAnimal = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAnimal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["animals"] });
		},
	});
};
