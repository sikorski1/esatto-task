"use client";
import { IAnimal } from "@/models/animal";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
type Props = {
	children?: React.ReactNode;
	animals: IAnimal[];
	onEdit: (animal: IAnimal) => void;
};

const DOG_IMAGES = [
	"/imgs/dog2.png",
	"/imgs/dog3.png",
	"/imgs/dog4.png",
	"/imgs/dog5.png",
	"/imgs/dog6.png",
	"/imgs/dog7.png",
];
const CAT_IMAGES = ["/imgs/cat1.png", "/imgs/cat2.png", "/imgs/cat3.png", "/imgs/cat4.png"];

export default function Cards({ animals, onEdit }: Props) {
	return (
		<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
			{animals.map((animal, index) => (
				<motion.div
					onClick={() => onEdit(animal)}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
					key={animal._id}
					className="relative p-4 h-[300px] bg-aqua-500 font-bold text-white text-lg shadow-strong-card cursor-pointer">
					<h2 className="absolute -top-6 inline-block p-2 text-xl text-aqua-900  bg-background shadow-strong">
						{animal.name}
					</h2>
					<div className="mt-8">
						<p>Type: {animal.type}</p>
						<p>Purebred: {animal.isPurebred ? "Yes" : "No"}</p>
					</div>
					<div className="absolute top-10 right-10 ">
						<Image
							src={
								animal.type === "dog" ? DOG_IMAGES[index % DOG_IMAGES.length] : CAT_IMAGES[index % CAT_IMAGES.length]
							}
							alt={animal.name}
							width={132}
							height={132}
							className="rounded-lg object-cover "
						/>
					</div>
					<p className="absolute bottom-6 left-8 flex flex-col justify-center items-center w-[72px] h-[72px] bg-background text-aqua-900 text-sm shadow-strong !rounded-full">
						Age <span className="text-2xl">{animal.age}</span>
					</p>
					<p className="absolute bottom-2 right-4 flex gap-2">
						<CalendarDays></CalendarDays>
						{new Date(animal.createdAt).toLocaleDateString()}
					</p>
				</motion.div>
			))}
		</div>
	);
}
