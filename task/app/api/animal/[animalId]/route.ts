import { validationAnimalSchema } from "@/api/animal/validation";
import connectMongoDB from "@/libs/mongodb";
import { Animal } from "@/models/animal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
interface Params {
	params: {
		animalId: string;
	};
}
const updateValidationAnimalSchema = validationAnimalSchema.partial();
export async function GET(request: Request, { params }: Params) {
	const { animalId } = await params;
	if (!mongoose.Types.ObjectId.isValid(animalId)) {
		return NextResponse.json({ message: "Wrong animal ID" }, { status: 400 });
	}
	try {
		await connectMongoDB();
		const animal = await Animal.findById(animalId);
		if (!animal) {
			return NextResponse.json({ message: "No animal found with the given id" }, { status: 404 });
		}
		return NextResponse.json({ animal }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching single animal", error }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: Params) {
	const { animalId } = await params;
	if (!mongoose.Types.ObjectId.isValid(animalId)) {
		return NextResponse.json({ message: "Wrong animal ID" }, { status: 400 });
	}
	try {
		const body = await request.json();
		const validation = updateValidationAnimalSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{
					message: "Validation error",
					errors: validation.error.flatten().fieldErrors,
				},
				{ status: 400 }
			);
		}
		const validationData = validation.data;
		await connectMongoDB();
		const updatedAnimal = await Animal.findByIdAndUpdate(animalId, validationData, { new: true, runValidators: true });
		if (!updatedAnimal) {
			return NextResponse.json({ message: "No animal found with the given id" }, { status: 404 });
		}
		return NextResponse.json({ message: "Animal updated successfully", animal: updatedAnimal }, { status: 200 });
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			return NextResponse.json({ message: "Data validation error", errors: error.errors }, { status: 400 });
		}
		return NextResponse.json({ message: "Error updating animal", error }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: Params) {
	const { animalId } = await params;
	if (!mongoose.Types.ObjectId.isValid(animalId)) {
		return NextResponse.json({ message: "Wrong animal ID" }, { status: 400 });
	}
	try {
		await connectMongoDB();
		const deletedAnimal = await Animal.findByIdAndDelete(animalId);
		if (!deletedAnimal) {
			return NextResponse.json({ message: "No animal found with the given id" }, { status: 404 });
		}
		return NextResponse.json({ message: "Animal deleted successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting animal", error }, { status: 500 });
	}
}
