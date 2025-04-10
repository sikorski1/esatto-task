"use client";
import { useFunFact } from "@/hooks/useFunFact";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Button from "./Button";

export default function FunFactTooltip() {
	const [showTooltip, setShowTooltip] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const { data, error, isLoading, refetch, isFetching } = useFunFact();

	const toggleTooltip = () => {
		setShowTooltip(prev => {
			const next = !prev;
			if (next) {
				refetch();
			}
			return next;
		});
	};

	return (
		<div className="w-full relative flex justify-end">
			<Button onClick={toggleTooltip} colors="bg-background text-black">
				Fun Fact
			</Button>
			<AnimatePresence>
				{showTooltip && (
					<motion.div
						ref={tooltipRef}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						className="absolute z-10 bottom-full right-0 mb-2 p-4 w-[300px] bg-aqua-500 text-background text-center font-bold rounded-xl shadow-strong space-y-4">
						{(isLoading || isFetching) && <p>Loading a fun fact...</p>}
						{error && !isFetching && <p>Oops! {error.message}</p>}
						{data && !isFetching && <p>{data[0].fact}</p>}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
