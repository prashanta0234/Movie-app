"use client";
import ErrorMessage from "@/components/shared/ErrorMessage";
import MovieCard from "@/components/shared/MovieCard";
import NoDataFound from "@/components/shared/NoDataFound";
import { MoviesType } from "@/schema/moviesSchema";
import { getPopularMoviesAction } from "@/server-actions/getPopularMovies";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const MovieList = () => {
	const [loading, setIsLoading] = useState(true);
	const [movies, setMovies] = useState<MoviesType>([]);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { ref, inView } = useInView();
	const [page, setPage] = useState(1);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const popularMovies = await getPopularMoviesAction({ page });
			setMovies((prev) => [...prev, ...popularMovies]);
		} catch (e: unknown) {
			console.error(e);
			setIsError(true);
			if (e instanceof Error) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage("An unknown error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	useEffect(() => {
		if (inView) {
			setPage((prev) => prev + 1);
		}
	}, [inView]);

	let content;
	if (movies.length === 0 && loading) {
		content = <p>Loading........</p>;
	} else if (isError) {
		content = <ErrorMessage message={errorMessage} />;
	} else if (movies.length === 0 && !loading) {
		content = <NoDataFound />;
	} else {
		content = (
			<div>
				<p className="font-bold text-lg text-primary">Popular Movies:</p>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-2">
					{movies.map((movie, idx: number) => (
						<MovieCard data={movie} key={idx} />
					))}
				</div>
				<div ref={ref}>Loading..</div>
			</div>
		);
	}

	return <>{content}</>;
};

export default MovieList;
