import { MovieType } from "@/schema/moviesSchema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ data }: { data: MovieType }) => {
	const { id, title, poster_path, vote_average, release_date } = data;
	return (
		<Link href={`/movies/${id}`}>
			<div className="min-h-[30%] w-full shadow-lg p-2 rounded-md dark:bg-primary border border-primary">
				<Image
					src={`https://image.tmdb.org/t/p/w500${poster_path}`}
					alt="Movie image"
					width={300}
					height={300}
					className="w-fill h-80"
				/>
				<div className="py-2">
					<p className="font-bold md:line-clamp-1">Name: {title}</p>
					<p>Avg Vote: {vote_average}/10 </p>
					<p>
						Release Date: {release_date === "" ? "Coming soon" : release_date}{" "}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
