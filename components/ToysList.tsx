import { IToy } from "@/models/toy";
import { colorToyList } from "@/utils/colorMap";
import { motion } from "framer-motion";
export default function ToysList({ toys }: { toys: IToy[] }) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{toys.length === 0 && (
				<p className="col-span-3 flex items-center justify-center h-[200px] text-2xl font-bold text-aqua-900">
					No toys found
				</p>
			)}
			{toys.map((toy, index) => (
				<motion.div
					key={toy._id}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.2,
						delay: Math.floor(index / 2) * 0.2,
					}}
					className={`color-slide ${colorToyList[toy.color].background} flex items-center justify-between p-4 ${
						colorToyList[toy.color].text
					}  text-aqua-900 font-bold text-xl shadow-strong -skew-x-4`}>
					<h3>{toy.name}</h3>
					<p>{toy.color}</p>
				</motion.div>
			))}
		</div>
	);
}
