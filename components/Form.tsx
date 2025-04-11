import Button from "@/components/Button";
import { ICat } from "@/models/cat";
import { IDog } from "@/models/dog";
import { useForm, useWatch } from "react-hook-form";

type FormProps = {
	mode: "add" | "edit";
	animal?: IDog | ICat;
	onSubmit: (data: IDog | ICat) => void;
	onClose: () => void;
	onDelete: (id: string) => void;
};

export default function Form({ mode, animal, onSubmit, onClose, onDelete }: FormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IDog | ICat>({
		defaultValues: {
			_id: animal?._id,
			name: animal?.name || "",
			type: animal?.type || "cat",
			age: animal?.age || 0,
			isPurebred: animal?.isPurebred || false,
			purssType: animal?.type === "cat" ? animal?.purssType || "Meow" : undefined,
			barkType: animal?.type === "dog" ? animal?.barkType || "Woof" : undefined,
		},
	});

	const submitForm = (data: IDog | ICat) => {
		const formattedData = { ...data };
		if (formattedData.type === "cat" && (!formattedData.purssType || formattedData.purssType.trim() === "")) {
			formattedData.purssType = "Meow";
		}

		if (formattedData.type === "dog" && (!formattedData.barkType || formattedData.barkType.trim() === "")) {
			formattedData.barkType = "Woof";
		}
		onSubmit(formattedData);
		onClose();
	};
	const animalType = useWatch({
		control,
		name: "type",
		defaultValue: animal?.type || "cat",
	});
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
			{mode === "add" && (
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
			)}
			<div>
				<label htmlFor="age" className="block text-lg">
					Age
				</label>
				<input
					type="number"
					placeholder=""
					{...register("age", { required: "Age is required", min: 1 })}
					className="w-full p-2 border shadow-strong-input"
				/>
				{errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
			</div>
			{(animalType.toLowerCase() === "cat" || animal?.type === "cat") && (
				<div>
					<label htmlFor="purssType" className="block text-lg">
						Purr Type
					</label>
					<input {...register("purssType")} placeholder="Meow" className="w-full p-2 border shadow-strong-input" />
				</div>
			)}

			{/* Conditional field for dog */}
			{(animalType.toLowerCase() === "dog" || animal?.type === "dog") && (
				<div>
					<label htmlFor="barkType" className="block text-lg">
						Bark Type
					</label>
					<input {...register("barkType")} placeholder="Woof" className="w-full p-2 border shadow-strong-input" />
				</div>
			)}
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
