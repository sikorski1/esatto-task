"use client";
import Button from "@/components/Button";
import { useGetAnimals } from "@/hooks/useAnimal";
import { useState } from "react";
import DiamondGrid from "./DiamondGrid";

export default function ClientCards() {
	const [queryParams, setQueryParams] = useState({
		page: 1,
		sortBy: "createdAt",
		order: "desc",
	});

	const { data, isLoading, error } = useGetAnimals(queryParams.page, queryParams.sortBy, queryParams.order);

	const changeSortField = (field: string) => {
		setQueryParams(prev => {
			if (prev.sortBy === field) {
				return {
					...prev,
					order: prev.order === "asc" ? "desc" : "asc",
				};
			} else {
				return {
					...prev,
					sortBy: field,
					order: "desc",
				};
			}
		});
	};
	const nextPage = () => {
		if (data?.hasNextPage) {
			setQueryParams(prev => ({
				...prev,
				page: prev.page + 1,
			}));
		}
	};

	const prevPage = () => {
		if (queryParams.page > 1) {
			setQueryParams(prev => ({
				...prev,
				page: prev.page - 1,
			}));
		}
	};

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="w-full">
			<div className="flex justify-between w-full mb-12">
				<div className="flex gap-4">
					<Button onClick={() => changeSortField("name")} isActive={queryParams.sortBy === "name"}>
						Sort by Name {queryParams.sortBy === "name" && (queryParams.order === "asc" ? "↑" : "↓")}
					</Button>
					<Button onClick={() => changeSortField("type")} isActive={queryParams.sortBy === "type"}>
						Sort by Type {queryParams.sortBy === "type" && (queryParams.order === "asc" ? "↑" : "↓")}
					</Button>
					<Button onClick={() => changeSortField("age")} isActive={queryParams.sortBy === "age"}>
						Sort by Age {queryParams.sortBy === "age" && (queryParams.order === "asc" ? "↑" : "↓")}
					</Button>
					<Button onClick={() => changeSortField("createdAt")} isActive={queryParams.sortBy === "createdAt"}>
						Sort by Date {queryParams.sortBy === "createdAt" && (queryParams.order === "asc" ? "↑" : "↓")}
					</Button>
				</div>
				<Button onClick={() => console.log("add")}>Add</Button>
			</div>
			{isLoading && <p className=" text-center">Loading...</p>}
			{data?.animals && <DiamondGrid animals={data.animals} />}

			<div className="flex justify-center gap-4 mt-4">
				<Button onClick={prevPage} disabled={queryParams.page === 1}>
					Previous Page
				</Button>
				<span className="py-2">Page {queryParams.page}</span>
				<Button onClick={nextPage} disabled={!data?.hasNextPage}>
					Next Page
				</Button>
			</div>
		</div>
	);
}
