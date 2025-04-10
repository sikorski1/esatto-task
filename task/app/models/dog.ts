import mongoose from "mongoose";
import { Animal, IAnimal } from "./animal";
export interface IDog extends IAnimal {
	type: "dog";
	barkType: string;
}
export const Dog =
	mongoose.models.Dog ||
	Animal.discriminator(
		"Dog",
		new mongoose.Schema({
			barkType: {
				type: String,
				default: "Woof",
				required: true,
			},
		})
	);
