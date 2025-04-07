import CardsContainer from "@/components/CardsContainer";
import Wrapper from "@/components/Wrapper";
export default function Home() {
	return (
		<>
			<header className="p-12 flex items-center justify-center">
				<h1 className="text-4xl font-bold">Esatto Task</h1>
			</header>
			<main>
				<Wrapper>
					<CardsContainer />
				</Wrapper>
			</main>
      <footer className="p-12 flex items-center justify-center">
        <p>Esatto Task</p>
      </footer>
		</>
	);
}
