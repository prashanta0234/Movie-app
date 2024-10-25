import MoviesDetails from "@/components/movies/MoviesDetails";
import RelatedMovies from "@/components/movies/RelatedMovies";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import { MovieType } from "@/schema/moviesSchema";
import { getMovieAction } from "@/server-actions/getMovie";
import { getMoviesAction } from "@/server-actions/getMovies";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {
	params: { id: string };
};

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

export async function generateStaticParams() {
	let allMovies: MovieType[] = [];

	// here i prefetch only 500 pages data because TMDB API accept page range 1-500
	for (let i = 1; i <= 500; i++) {
		const movies: MovieType[] = await getMoviesAction({ page: i });
		allMovies = [...allMovies, ...movies];
	}

	return allMovies.map((movie) => ({
		id: String(movie.id),
	}));
}

const MoviePage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	let movie: MovieDetailsType | null = null;
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
			<Breadcrumb className="my-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbPage>
						<Link href={`/movies${id}`}>
							<p className="line-clamp-1">{movie.title}</p>
						</Link>
					</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<MoviesDetails movie={movie} />
			<RelatedMovies id={movie.id} />
		</div>
	);
};

export default MoviePage;
