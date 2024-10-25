"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react"; // Add a check icon for watched
import { addWatchList, checkWatchlist } from "@/server-actions/indexdbAction";
import { toast } from "sonner";
import { watchlist } from "@/types/watchList";

const AddWatchList = (movie: watchlist) => {
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	useEffect(() => {
		const checkIfInWatchlist = async () => {
			const isMovieInWatchlist = await checkWatchlist(movie.id);
			setIsInWatchlist(isMovieInWatchlist);
		};
		checkIfInWatchlist();
	}, [movie.id]);

	const handleWatchlistAddRemove = async () => {
		const result = await addWatchList(movie);
		setIsInWatchlist(result.added);
		const toastId = toast.success("Movie added/removed in watch list");
		setTimeout(() => {
			toast.dismiss(toastId);
		}, 30000);
	};

	return (
		<div>
			{movie.isWatchList ? (
				<Button onClick={movie.onRemove} className="text-xl ">
					<BookmarkCheck className="dark:text-white text-black" />
				</Button>
			) : (
				<Button onClick={handleWatchlistAddRemove} className="text-xl ">
					{isInWatchlist ? (
						<BookmarkCheck className="dark:text-white text-black" />
					) : (
						<BookmarkPlus className="dark:text-white text-black" />
					)}
				</Button>
			)}
		</div>
	);
};

export default AddWatchList;
