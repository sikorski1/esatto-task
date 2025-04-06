import { z } from "zod";
export const validationAnimalSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	type: z.enum(["cat", "dog"], {
		required_error: "Type is required",
		invalid_type_error: 'Type must be either "cat" or "dog"',
	}),
	isPurebred: z.boolean().optional(),
	age: z.number().min(0, { message: "Age must be a positive number" }),
});
