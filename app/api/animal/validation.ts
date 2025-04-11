import { z } from "zod";

const baseAnimalSchema = {
	name: z.string().min(1, { message: "Name is required" }),
	isPurebred: z.boolean().optional(),
	age: z.coerce.number().min(1, { message: "Age must be a positive number" }),
	favouriteToys: z
		.array(
			z.object({
				_id: z.string(),
				name: z.string(),
				color: z.string(),
			})
		)
		.optional(),
};
export const validationAnimalSchema = z.discriminatedUnion("type", [
	z.object({
		...baseAnimalSchema,
		type: z.literal("dog"),
		barkType: z.string().default("Woof"),
	}),
	z.object({
		...baseAnimalSchema,
		type: z.literal("cat"),
		purssType: z.string().default("Meow"),
	}),
]);
export const updateValidationAnimalSchema = z.object({
	name: z.string().min(1).optional(),
	isPurebred: z.boolean().optional(),
	age: z.coerce.number().min(0).optional(),
	barkType: z.string().optional(),
	purssType: z.string().optional(),
	favouriteToys: z
		.array(
			z.object({
				_id: z.string(),
				name: z.string(),
				color: z.string(),
			})
		)
		.optional(),
});
