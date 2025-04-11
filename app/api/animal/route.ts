import { validationAnimalSchema } from "@/app/api/animal/validation";
import connectMongoDB from "@/libs/mongodb";
import { Animal } from "@/models/animal";
import { Cat } from "@/models/cat";
import { Dog } from "@/models/dog";
import { NextResponse } from "next/server";
const PER_PAGE = 15;
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
		const { type, ...data } = validation.data;
		let animal;
		if (type === "dog") {
			animal = new Dog({ ...data });
		} else if (type === "cat") {
			animal = new Cat({ ...data });
		} else {
			return NextResponse.json({ message: "Invalid animal type" }, { status: 400 });
		}
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
		const sortBy = url.searchParams.get("sortBy") || "createdAt";
		const order = url.searchParams.get("order") === "asc" ? 1 : -1;
		const skip = (page - 1) * PER_PAGE;
		const search = url.searchParams.get("search") || "";
		let filterQuery: any = {};
		if (search) {
			filterQuery = { name: { $regex: search, $options: "i" } };
		}
		const [animals, totalAnimals] = await Promise.all([
			Animal.find(filterQuery)
				.populate("Toys")
				.sort({ [sortBy]: order })
				.skip(skip)
				.limit(PER_PAGE)
				.exec(),
			Animal.countDocuments(filterQuery).exec(),
		]);
		const totalPages = Math.ceil(totalAnimals / PER_PAGE);
		const hasNextPage = page < totalPages;
		return NextResponse.json(
			{
				animals,
				currentPage: page,
				totalPages,
				totalAnimals,
				hasNextPage,
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
