import { IAnimal } from "@/models/animal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AnimalResponse = {
	currentPage: number;
	totalPages: number;
	totalAnimals: number;
	limit: number;
	hasNextPage: boolean;
	animals: IAnimal[];
};

export const fetchAnimals = async (page: number, sortBy: string, order: string): Promise<AnimalResponse> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/animal?page=${page}&sortBy=${sortBy}&order=${order}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching animals:", error);
		throw new Error("Failed to fetch animals data");
	}
};

export const postAnimal = async ({ data }: { data: IAnimal }): Promise<AnimalResponse> => {
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

export const updateAnimal = async ({ data }: { data: IAnimal }): Promise<AnimalResponse> => {
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
		console.log(id, ` ${process.env.NEXT_PUBLIC_API_URL}/api/animal/${id}`);
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

export const useGetAnimals = (page: number, sortBy: string, order: string) => {
	return useQuery<AnimalResponse, Error>({
		queryKey: ["animals", page, sortBy, order],
		queryFn: () => fetchAnimals(page, sortBy, order),
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
