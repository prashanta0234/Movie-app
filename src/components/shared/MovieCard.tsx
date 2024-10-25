import { imageMaker } from "@/helper/imageMaker";
import { MovieType } from "@/schema/moviesSchema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddWatchList from "../movies/AddWatchList";

const MovieCard = ({
	data,
	isWatchList = false,
	handleRemove,
}: {
	data: MovieType;
	isWatchList?: boolean;
	handleRemove?: () => void;
}) => {
	const { id, title, poster_path, vote_average, release_date } = data;
	return (
		<div className="min-h-[30%] w-full shadow-lg p-2 rounded-md dark:bg-primary border border-primary">
			<Link href={`/movies/${id}`}>
				<Image
					src={imageMaker(poster_path as string)}
					alt="Movie image"
					width={300}
					height={300}
					className="w-full h-80"
				/>
			</Link>

			<div className="py-2">
				<div className="flex justify-between">
					<Link href={`/movies/${id}`} className="flex-1">
						<p className="font-bold md:line-clamp-1">Name: {title}</p>
					</Link>
					<AddWatchList
						id={id}
						poster_path={poster_path}
						release_date={release_date}
						title={title}
						vote_average={vote_average}
						isWatchList={isWatchList}
						onRemove={handleRemove}
					/>
				</div>

				<Link href={`/movies/${id}`}>
					<div>
						<p>Avg Vote: {vote_average}/10 </p>
						<p>
							Release Date: {release_date === "" ? "Coming soon" : release_date}{" "}
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default MovieCard;
