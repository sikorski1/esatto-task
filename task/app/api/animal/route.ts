import connectMongoDB from "@/libs/mongodb";
import { Animal } from "@/models/animal";
import { NextResponse } from "next/server";
import { validationAnimalSchema } from "./validation";
export async function POST(request: Request) {
	try {
		await connectMongoDB();
		const body = await request.json();
		const validation = validationAnimalSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{
					message: "Validation error",
					errors: validation.error.flatten().fieldErrors,
				},
				{ status: 400 }
			);
		}
		const { name, type, isPurebred, age } = validation.data;
		const animal = new Animal({ name, type, isPurebred, age });
		await animal.save();
		return NextResponse.json(
			{
				message: "Animal created successfully",
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Error creating animal",
				error,
			},
			{ status: 500 }
		);
	}
}

const PER_PAGE = 10;
export async function GET(request: Request) {
	try {
		await connectMongoDB();
		const url = new URL(request.url);
		const pageParam = url.searchParams.get("page");
		let page = 1;
		if (pageParam) {
			const parsedPage = parseInt(pageParam, 10);
			if (!isNaN(parsedPage) && parsedPage > 0) {
				page = parsedPage;
			}
		}
		const skip = (page - 1) * PER_PAGE;
		const [animals, totalAnimals] = await Promise.all([
			Animal.find().sort({ createdAt: -1 }).skip(skip).limit(PER_PAGE).exec(),
			Animal.countDocuments().exec(),
		]);
		const totalPages = Math.ceil(totalAnimals / PER_PAGE);
		return NextResponse.json(
			{
				animals,
				currentPage: page,
				totalPages,
				totalAnimals,
				limit: PER_PAGE,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Error fetching animals",
				error,
			},
			{ status: 500 }
		);
	}
}
