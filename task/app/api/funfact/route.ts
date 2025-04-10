import axios from "axios";
import { NextResponse } from "next/server";
export async function GET() {
	try {
		const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
			headers: {
				"X-Api-Key": process.env.API_NINJAS_KEY || "",
			},
		});
		return NextResponse.json(response.data);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.response?.data);
			return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
		}
		console.error("Unknown error:", error);
		return NextResponse.json({ error: "Unknown error" }, { status: 500 });
	}
}
