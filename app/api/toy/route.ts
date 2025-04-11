import connectMongoDB from "@/libs/mongodb";
import { Toy } from "@/models/toy";
import { NextResponse } from "next/server";
export async function GET() {
	try {
		await connectMongoDB();
		const toys = await Toy.find();
		return NextResponse.json(
			{
				toys,
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
