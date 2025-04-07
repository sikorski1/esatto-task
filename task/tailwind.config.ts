import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#f2efe7",
				aqua: {
					100: "#9ACBD0",
					500: "#48A6A7",
					900: "#006A71",
				},
			},
		},
	},
};
export default config;
