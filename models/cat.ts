import mongoose from "mongoose";
import { Animal, IAnimal } from "./animal";
export interface ICat extends IAnimal {
	type: "cat";
	purssType: string;
}
export const Cat =
	mongoose.models.Cat ||
	Animal.discriminator(
		"Cat",
		new mongoose.Schema({
			purssType: {
				type: String,
				default: "Meow",
				required: true,
			},
		})
	);
