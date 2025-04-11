"use client";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { useDeleteAnimal, useGetAnimals, usePostAnimal, useUpdateAnimal } from "@/hooks/useAnimal";
import { useGetToys } from "@/hooks/useToys";
import { ICat } from "@/models/cat";
import { IDog } from "@/models/dog";
import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import ToysList from "./ToysList";
type ModalState =
	| { isOpen: false; mode: "add" }
	| { isOpen: true; mode: "add" }
	| { isOpen: true; mode: "edit"; animal: IDog | ICat };
export default function ClientCards() {
	const [queryParams, setQueryParams] = useState({
		page: 1,
		sortBy: "createdAt",
		order: "desc",
		search: "",
	});
	const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: "add" });
	const [viewType, setViewType] = useState<"animals" | "toys">("animals");
	const openAddModal = () => setModalState({ isOpen: true, mode: "add" });

	const {
		data: animals,
		isLoading: isLoadingAnimals,
		error: animalsError,
	} = useGetAnimals(queryParams.page, queryParams.sortBy, queryParams.order, queryParams.search);
	const { data: toys, isLoading: isLoadingToys, error: toysError } = useGetToys(queryParams.page);
	const { mutate: createAnimal } = usePostAnimal();
	const { mutate: updateAnimal } = useUpdateAnimal();
	const { mutate: deleteAnimal } = useDeleteAnimal();

	const openEditModal = (animal: IDog | ICat) => {
		setModalState({ isOpen: true, mode: "edit", animal });
	};

	const closeModal = () => setModalState({ isOpen: false, mode: "add" });

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
					page: 1,
				};
			}
		});
	};
	const nextPage = () => {
		if (animals?.hasNextPage) {
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
	const handleSearch = useCallback((value: string) => {
		setQueryParams(prev => ({
			...prev,
			search: value,
			page: 1,
		}));
	}, []);
	const handleFormSubmit = (data: IDog | ICat) => {
		if (modalState.mode === "add") {
			createAnimal({ data });
		} else if (modalState.mode === "edit") {
			updateAnimal({ data });
		}
		closeModal();
	};
	const handleDelete = (id: string) => {
		deleteAnimal({ id });
	};
	if (animalsError && viewType === "animals") return <div>Error: {animalsError.message}</div>;
	if (toysError && viewType === "toys") return <div>Error: {toysError.message}</div>;
	return (
		<>
			{modalState.isOpen && (
				<Modal onClose={closeModal}>
					<div className="p-8 bg-white rounded-xl text-black text-lg w-[440px] max-w-[90vw]">
						<Form
							mode={modalState.mode}
							animal={modalState.mode === "edit" ? modalState.animal : undefined}
							toys={toys?.toys}
							onSubmit={handleFormSubmit}
							onClose={closeModal}
							onDelete={handleDelete}
						/>
					</div>
				</Modal>
			)}
			<div className="flex gap-4 mb-4">
				<Button onClick={() => setViewType("animals")} isActive={viewType === "animals"}>
					Animals
				</Button>
				<Button onClick={() => setViewType("toys")} isActive={viewType === "toys"}>
					Toys
				</Button>
			</div>
			<div className="w-full">
				{viewType === "animals" && (
					<>
						<div className="flex flex-col sm:flex-row justify-between w-full mb-12">
							<SearchInput initialValue={queryParams.search} onSearch={handleSearch} />
							<div className="flex mb-4 justify-center items-center flex-wrap gap-2 sm:mb-0 sm:sm:gap-4 sm:flex-nowrap">
								<Button onClick={() => changeSortField("type")} isActive={queryParams.sortBy === "type"}>
									Sort by Type{queryParams.sortBy === "type" && (queryParams.order === "asc" ? ": 🐱" : ": 🐶")}
								</Button>
								<Button onClick={() => changeSortField("name")} isActive={queryParams.sortBy === "name"}>
									Sort by Name {queryParams.sortBy === "name" && (queryParams.order === "asc" ? "↑" : "↓")}
								</Button>
								<Button onClick={() => changeSortField("age")} isActive={queryParams.sortBy === "age"}>
									Sort by Age {queryParams.sortBy === "age" && (queryParams.order === "asc" ? "↑" : "↓")}
								</Button>
								<Button onClick={() => changeSortField("createdAt")} isActive={queryParams.sortBy === "createdAt"}>
									Sort by Date {queryParams.sortBy === "createdAt" && (queryParams.order === "asc" ? "↑" : "↓")}
								</Button>
							</div>
							<Button onClick={openAddModal}>Add</Button>
						</div>
						{isLoadingAnimals && <p className=" text-center">Loading...</p>}
						{animals?.animals && <Cards animals={animals.animals} onEdit={openEditModal} />}
						<div className="flex justify-center gap-4 mt-12">
							<Button
								onClick={() => {
									prevPage();
									document.getElementById("header-scroll")?.scrollIntoView();
								}}
								disabled={queryParams.page === 1}>
								Previous Page
							</Button>
							<span className="flex justify-center items-center w-[64px] h-[64px] text-aqua-900 font-bold text-xl shadow-strong ">
								{queryParams.page}
							</span>
							<Button
								onClick={() => {
									nextPage();
									document.getElementById("header-scroll")?.scrollIntoView();
								}}
								disabled={!animals?.hasNextPage}>
								Next Page
							</Button>
						</div>
					</>
				)}
				{viewType === "toys" && (
					<>
						{isLoadingToys && <p className=" text-center">Loading...</p>}
						{toys?.toys && <ToysList toys={toys.toys} />}
					</>
				)}
			</div>
		</>
	);
}
