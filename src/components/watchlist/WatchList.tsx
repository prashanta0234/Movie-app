"use client";

import React, { useEffect, useState } from "react";
import { MovieDetailsType } from "@/schema/movieDetailsSchema";
import {
	getWatchlist,
	removeFromWatchlist,
} from "@/server-actions/indexdbAction";
import MovieCard from "../shared/MovieCard";
import NoDataFound from "../shared/NoDataFound";
import HandlePerseError from "../shared/HandlePerseError";
import { useErrorStore } from "@/zutand/zutand.store";

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState<MovieDetailsType[]>([]);
	const [loading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const { isError, setIsError } = useErrorStore();

	useEffect(() => {
		setIsLoading(true);
		try {
			const fetchWatchlist = async () => {
				const movies = await getWatchlist();
				setWatchlist(movies);
			};

			fetchWatchlist();
		} catch (e: unknown) {
			console.error(e);
			setIsError(true);
			setErrorMessage(
				e instanceof Error ? e.message : "An unknown error occurred"
			);
		} finally {
			setIsLoading(false);
		}

		setIsLoading(false);
	}, [setIsError]);

	const handleRemove = async (movieId: number) => {
		setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
		try {
			await removeFromWatchlist(movieId);
		} catch (error) {
			console.error("Failed to remove movie:", error);
		}
	};

	let content;
	if (watchlist.length === 0 && loading) {
		content = <p>Loading........</p>;
	} else if (isError) {
		content = <HandlePerseError message={errorMessage} />;
	} else if (watchlist.length === 0 && !loading) {
		content = <NoDataFound />;
	} else {
		content = (
			<div>
				<h2 className="font-bold text-lg text-primary">Your Watchlist:</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
					{watchlist.map((movie, idx) => (
						<MovieCard
							data={movie}
							key={idx}
							isWatchList={true}
							handleRemove={() => handleRemove(movie.id)}
						/>
					))}
				</div>
			</div>
		);
	}

	return <>{content}</>;
};

export default Watchlist;
