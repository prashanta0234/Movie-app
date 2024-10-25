import React from "react";
import Image from "next/image";
import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import getCastAction from "@/server-actions/getCasts";
import { imageMaker } from "@/helper/imageMaker";
import dynamic from "next/dynamic";

import AddWatchList from "./AddWatchList";
const CastCard = dynamic(() => import("./CastCard"));

const MoviesDetails = async ({ movie }: { movie: MovieDetailsType }) => {
	const { poster_path, original_title, overview, release_date, id } = movie;
	const casts = await getCastAction(id);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
			<Image
				src={imageMaker(poster_path as string)}
				alt={original_title}
				width={500}
				height={100}
				className="w-full h-full"
			/>
			<div className="md:h-[750px]">
				<div>
					<h1 className="text-2xl font-bold">{original_title}</h1>
					<p className="mt-2">{overview}</p>
					<p className="mt-2 text-gray-500">Release Date: {release_date}</p>
				</div>
				<AddWatchList movie={movie} />
				<div className=" md:h-[70%] lg:h-[75%] xl:h-full 2xl:h-[125%] mt-2">
					<h1 className="font-bold text-primary text-lg">Cast: </h1>
					<div className="md:h-full grid grid-cols-2 md:grid-cols-3  gap-2  overflow-scroll  overflow-x-hidden">
						{casts.map((cast, idx) => (
							<CastCard cast={cast} key={idx} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoviesDetails;
