import mongoose, { Schema } from "mongoose";
export interface IAnimal {
	_id: string;
	name: string;
	type: "cat" | "dog";
	isPurebred: boolean;
	age: number;
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
		type: {
			type: String,
			required: true,
			enum: ["cat", "dog"],
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
	},
	{
		timestamps: true,
	}
);
export const Animal = mongoose.models.Animal || mongoose.model<IAnimal>("Animal", AnimalSchema);
