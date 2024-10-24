// import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import { getMovieAction } from "@/server-actions/getMovie";
import { Metadata } from "next";
// import Image from "next/image";
import React from "react";

type Props = {
	params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	if (!params.id) {
		return {
			title: `Not Found - Movie app (Best movie app in the world)`,
			description: "Best Movie app is the most useful Bangladeshi movie app.",
		};
	}

	const { id } = params;
	const {
		original_title,
		poster_path,
		overview,
		origin_country,
		release_date,
		homepage,
	} = await getMovieAction({ id });

	return {
		title: `${original_title} - Movie app (Best movie app in the world)`,
		openGraph: {
			images: [`https://image.tmdb.org/t/p/w500${poster_path}`],
			type: "video.movie",
			countryName: origin_country[0],
			description: overview,
			releaseDate: release_date,
			url: homepage,
			title: original_title,
		},
		description: overview,
		keywords: [original_title, ...origin_country, "Movies", release_date],
		robots: "index, follow",
	};
}

const MovieDetailsPage = () => {
	// if (!movie) {
	// 	return <div>Movie not found</div>;
	// }

	return (
		<div>
			{/* <h1>{movie.original_title}</h1>
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.original_title}
			/>
			<p>{movie.overview}</p>
			<p>Release Date: {movie.release_date}</p>
			<p>Country: {movie.origin_country[0]}</p> */}
		</div>
	);
};

export default MovieDetailsPage;
