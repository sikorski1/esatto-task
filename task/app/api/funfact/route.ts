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
	} catch (error:any) {
		console.error("Error fetching fun fact:", error.response.data);
		return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
	}
}
