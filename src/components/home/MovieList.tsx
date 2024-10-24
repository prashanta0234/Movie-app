"use client";

import MovieCard from "@/components/shared/MovieCard";
import NoDataFound from "@/components/shared/NoDataFound";
import { MoviesType } from "@/schema/moviesSchema";
import { getMoviesAction } from "@/server-actions/getMovies";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { useErrorStore } from "@/zutand/zutand.store";
import HandlePerseError from "../shared/HandlePerseError";

const MovieList = () => {
	const [loading, setIsLoading] = useState(true);
	const [movies, setMovies] = useState<MoviesType>([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { ref, inView } = useInView();
	const [page, setPage] = useState(1);
	const [isendContent, setIsEndContent] = useState(false);

	const searchParams = useSearchParams();
	const query = searchParams.get("title");

	const { isError, setIsError } = useErrorStore();

	const fetchData = useCallback(
		async (page: number, resetMovies: boolean = false) => {
			setIsLoading(true);
			try {
				const results = query
					? await getMoviesAction({ query: `title=${query}`, page })
					: await getMoviesAction({ page });

				setMovies((prev) => (resetMovies ? results : [...prev, ...results]));
				if (results.length == 0) {
					setIsEndContent(true);
				}
				setIsError(false);
			} catch (e: unknown) {
				console.error(e);
				setIsError(true);
				setErrorMessage(
					e instanceof Error ? e.message : "An unknown error occurred"
				);
			} finally {
				setIsLoading(false);
			}
		},
		[query, setIsError]
	);

	useEffect(() => {
		if (page === 1) {
			fetchData(page, true);
		} else {
			fetchData(page);
		}
	}, [fetchData, page, searchParams]);

	useEffect(() => {
		if (inView && !isError) {
			setPage((prev) => prev + 1);
		}
	}, [inView, isError]);

	useEffect(() => {
		setMovies([]);
		setPage(1);
		setIsEndContent(false);
	}, [searchParams]);

	let content;
	if (movies.length === 0 && loading) {
		content = <p>Loading........</p>;
	} else if (isError) {
		content = <HandlePerseError message={errorMessage} />;
	} else if (movies.length === 0 && !loading) {
		content = <NoDataFound />;
	} else {
		content = (
			<div>
				<p className="font-bold text-lg text-primary">
					{query ? `Search Results for "${query}":` : "Popular Movies:"}
				</p>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-2">
					{movies.map((movie, idx: number) => (
						<MovieCard data={movie} key={idx} />
					))}
				</div>
				{isendContent ? (
					<p className="text-center">No more items found!</p>
				) : (
					<div ref={ref}>Loading..</div>
				)}
			</div>
		);
	}

	return <>{content}</>;
};

export default MovieList;
