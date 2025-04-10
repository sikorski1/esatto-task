"use client";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { useDeleteAnimal, useGetAnimals, usePostAnimal, useUpdateAnimal } from "@/hooks/useAnimal";
import { IAnimal } from "@/models/animal";
import { useState } from "react";
type ModalState =
	| { isOpen: false; mode: "add" }
	| { isOpen: true; mode: "add" }
	| { isOpen: true; mode: "edit"; animal: IAnimal };
export default function ClientCards() {
	const [queryParams, setQueryParams] = useState({
		page: 1,
		sortBy: "createdAt",
		order: "desc",
	});
	const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: "add" });
	const openAddModal = () => setModalState({ isOpen: true, mode: "add" });

	const { data, isLoading, error } = useGetAnimals(queryParams.page, queryParams.sortBy, queryParams.order);
	const { mutate: createAnimal } = usePostAnimal();
	const { mutate: updateAnimal } = useUpdateAnimal();
	const { mutate: deleteAnimal } = useDeleteAnimal();

	const openEditModal = (animal: IAnimal) => {
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

	const handleFormSubmit = (data: IAnimal) => {
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
	if (error) return <div>Error: {error.message}</div>;
	return (
		<>
			{modalState.isOpen && (
				<Modal onClose={closeModal}>
					<div className="p-8 bg-white rounded-xl text-black text-lg w-[440px] max-w-[90vw]">
						<Form
							mode={modalState.mode}
							animal={modalState.mode === "edit" ? modalState.animal : undefined}
							onSubmit={handleFormSubmit}
							onClose={closeModal}
							onDelete={handleDelete}
						/>
					</div>
				</Modal>
			)}
			<div className="w-full">
				<div className="flex justify-between w-full mb-12">
					<div className="flex gap-4">
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
				{isLoading && <p className=" text-center">Loading...</p>}
				{data?.animals && <Cards animals={data.animals} onEdit={openEditModal} />}

				<div className="flex justify-center gap-4 mt-12">
					<Button
						onClick={() => {
							prevPage();
							document.getElementById("header")?.scrollIntoView({ behavior: "smooth" });
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
							document.getElementById("header")?.scrollIntoView({ behavior: "smooth" });
						}}
						disabled={!data?.hasNextPage}>
						Next Page
					</Button>
				</div>
			</div>
		</>
	);
}
