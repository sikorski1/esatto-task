import Button from "@/components/Button";
import { ICat } from "@/models/cat";
import { IDog } from "@/models/dog";
import { IToy } from "@/models/toy";
import { colorToySelect } from "@/utils/colorMap";
import { useForm, useWatch } from "react-hook-form";
type FormProps = {
	mode: "add" | "edit";
	animal?: IDog | ICat;
	toys?: IToy[];
	onSubmit: (data: IDog | ICat) => void;
	onClose: () => void;
	onDelete: (id: string) => void;
};
export default function Form({ mode, animal, toys, onSubmit, onClose, onDelete }: FormProps) {
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
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
			favouriteToys: (animal?.favouriteToys?.map(toy => toy._id) as unknown as IToy[]) || ([] as IToy[]),
		},
	});

	const submitForm = (data: IDog | ICat) => {
		const formattedData: IDog | ICat = {
			...data,
			favouriteToys: toys?.filter(toy => data.favouriteToys.includes(toy._id as unknown as IToy)) || [],
		};

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
			{toys && (
				<div>
					<label className="block text-lg mb-2">Favourite Toys</label>
					<div className="h-64 overflow-y-auto border p-2">
						<div className="grid grid-cols-3 gap-3">
							{toys.map(toy => (
								<div
									key={toy._id}
									className={`flex justify-center items-center p-3 shadow-strong-select cursor-pointer transition-colors uppercase ${
										Array.isArray(watch("favouriteToys")) && watch("favouriteToys").includes(toy._id as unknown as IToy)
											? `${colorToySelect[toy.color].background} ${colorToySelect[toy.color].text}`
											: colorToySelect[toy.color].hoverBackground
									}`}
									onClick={() => {
										const currentToys = Array.isArray(getValues("favouriteToys"))
											? [...getValues("favouriteToys")]
											: [];

										if (currentToys.includes(toy._id as unknown as IToy)) {
											setValue(
												"favouriteToys",
												currentToys.filter(id => id !== (toy._id as unknown as IToy)),
												{ shouldValidate: true }
											);
										} else {
											setValue("favouriteToys", [...currentToys, toy._id as unknown as IToy], { shouldValidate: true });
										}
									}}>
									<p className="text-center">{toy.name}</p>
								</div>
							))}
						</div>
					</div>
					<input type="hidden" {...register("favouriteToys")} />
				</div>
			)}
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
