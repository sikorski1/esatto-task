import Button from "@/components/Button";
import { IAnimal } from "@/models/animal";
import { useForm } from "react-hook-form";

type FormProps = {
	mode: "add" | "edit";
	animal?: IAnimal;
	onSubmit: (data: IAnimal) => void;
	onClose: () => void;
	onDelete: (id: string) => void;
};

export default function Form({ mode, animal, onSubmit, onClose, onDelete }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAnimal>({
		defaultValues: {
			_id: animal?._id,
			name: animal?.name || "",
			type: animal?.type || "cat",
			age: animal?.age || 0,
			isPurebred: animal?.isPurebred || false,
		},
	});

	const submitForm = (data: IAnimal) => {
		onSubmit(data);
		onClose();
	};

	return (
		<form onSubmit={handleSubmit(submitForm)} className="space-y-4">
			<div>
				<label htmlFor="name" className="block text-lg">
					Name
				</label>
				<input
					{...register("name", { required: "Name is required" })}
					className="w-full p-2 border shadow-strong-input"
				/>
				{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
			</div>

			<div>
				<label htmlFor="type" className="block text-lg">
					Type
				</label>
				<select
					{...register("type", { required: "Type is required" })}
					className="w-full p-2 border shadow-strong-input">
					<option value="dog">Dog</option>
					<option value="cat">Cat</option>
				</select>
				{errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
			</div>

			<div>
				<label htmlFor="age" className="block text-lg">
					Age
				</label>
				<input
					type="number"
					{...register("age", { required: "Age is required", min: 1 })}
					className="w-full p-2 border shadow-strong-input"
				/>
				{errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
			</div>

			<div className="flex gap-2">
				<label htmlFor="isPurebred" className="block text-lg">
					Is Purebred
				</label>
				<input id="isPurebred" type="checkbox" {...register("isPurebred")} className="p-2" />
			</div>

			<div className="mt-6 flex justify-end gap-4">
				{mode == "edit" && animal && (
					<button
						onClick={() => {
							onDelete(animal._id);
							onClose();
						}}
						type="button"
						className="p-2 text-red-500  font-bold text-xl shadow-strong-delete">
						Delete
					</button>
				)}
				<Button onClick={onClose}>Close</Button>
				<Button type="submit">{mode === "edit" ? "Save Changes" : "Add Animal"}</Button>
			</div>
		</form>
	);
}
