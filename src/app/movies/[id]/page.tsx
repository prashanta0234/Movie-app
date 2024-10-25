import MoviesDetails from "@/components/movies/MoviesDetails";
import RelatedMovies from "@/components/movies/RelatedMovies";
import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import { MovieType } from "@/schema/moviesSchema";
import { getMovieAction } from "@/server-actions/getMovie";
import { getMoviesAction } from "@/server-actions/getMovies";
import getTotalPageAction from "@/server-actions/getTotalPage";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
	params: { id: string };
};

// Fetch metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = params;
	const movie = await getMovieAction({ id: Number(id) });

	if (!movie) {
		return {
			title: `Not Found - Movie app (Best movie app in the world)`,
			description: "Best Movie app is the most useful Bangladeshi movie app.",
		};
	}

	const { original_title, poster_path, overview, release_date, homepage } =
		movie;

	return {
		title: `${original_title} - Movie app (Best movie app in the world)`,
		openGraph: {
			images: [`https://image.tmdb.org/t/p/w500${poster_path}`],
			type: "video.movie",
			description: overview as string,
			releaseDate: release_date,
			url: homepage as string,
			title: original_title as string,
		},
		description: overview,
		keywords: [original_title as string, "Movies", release_date as string],
		robots: "index, follow",
	};
}

// export async function generateStaticParams() {
// 	let allMovies: MovieType[] = [];
// 	const totalPages = await getTotalPageAction();

// 	for (let i = 1; i <= totalPages; i++) {
// 		const movies: MovieType[] = await getMoviesAction({ page: i });
// 		allMovies = [...allMovies, ...movies];
// 	}

// 	return allMovies.map((movie) => ({
// 		id: String(movie.id),
// 	}));
// }

const MoviePage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	let movie: MovieDetailsType | null = null; // Ensure the movie can be null

	try {
		movie = await getMovieAction({ id: Number(id) });
	} catch (error) {
		console.error("Error fetching movie:", error);
	}

	if (!movie) {
		return <div>Movie not found</div>;
	}

	return (
		<div>
			<MoviesDetails movie={movie} />
			<RelatedMovies id={movie.id} />
		</div>
	);
};

export default MoviePage;

// Enable ISR by setting revalidate option inside fetch calls
export const revalidate = 60; // Revalidate the page every 60 seconds
