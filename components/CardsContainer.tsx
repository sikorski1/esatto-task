import ClientCards from "@/components/ClientCards";
import { fetchAnimals } from "@/hooks/useAnimal";
import { fetchToys } from "@/hooks/useToys";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
export default async function CardsContainer() {
	const queryClient = new QueryClient();

	const page = 1;
	const sortBy = "createdAt";
	const order = "desc";
	const search = "";
	await queryClient.prefetchQuery({
		queryKey: ["animals", page, sortBy, order, search],
		queryFn: () => fetchAnimals(page, sortBy, order, search),
	});
	await queryClient.prefetchQuery({
		queryKey: ["toys", page],
		queryFn: () => fetchToys(page),
	});

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ClientCards />
			</HydrationBoundary>
		</>
	);
}
