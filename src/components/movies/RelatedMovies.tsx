import { getRecommendedMovieAction } from "@/server-actions/getRecomendedMovie";
import React from "react";
import MovieCard from "../shared/MovieCard";

const RelatedMovies = async ({ id }: { id: number }) => {
	const movies = await getRecommendedMovieAction({ id });
	return (
		<div className="my-6 mt-12">
			<h1 className="text-xl font-bold my-4">Recommendations:</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{movies.map((movie, idx) => (
					<MovieCard data={movie} key={idx} />
				))}
			</div>
		</div>
	);
};

export default RelatedMovies;
