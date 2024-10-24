import MovieList from "@/components/home/MovieList";
import SearchInput from "@/components/shared/SearchInput";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Movie app",
	description: "Worlds most popular movies site",
};
const Home = () => {
	return (
		<>
			<div>
				<div className="md:hidden block mb-2">
					<SearchInput />
				</div>
				<MovieList />
			</div>
		</>
	);
};

export default Home;
