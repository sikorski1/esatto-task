import mongoose from "mongoose";
export interface IToy {
	_id: string;
	name: string;
	color: string;
}
const toySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
	},
});

export const Toy = mongoose.models.Toy || mongoose.model<IToy>("Toy", toySchema);
