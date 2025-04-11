import { IToy } from "./toy";
import mongoose, { Schema } from "mongoose";
export interface IAnimal {
	_id: string;
	name: string;
	isPurebred: boolean;
	age: number;
	favouriteToys: IToy[];
	type: "dog" | "cat";
	createdAt: Date;
	updatedAt: Date;
}
const AnimalSchema: Schema<IAnimal> = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		isPurebred: {
			type: Boolean,
			default: false,
		},
		age: {
			type: Number,
			required: true,
			min: 0,
		},
		favouriteToys: [{ type: Schema.Types.ObjectId, ref: "Toy" }],
	},
	{
		discriminatorKey: "type",
		timestamps: true,
	}
);
export const Animal = mongoose.models.Animal || mongoose.model<IAnimal>("Animal", AnimalSchema);
