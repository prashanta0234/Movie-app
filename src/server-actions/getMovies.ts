"use server";

import { reqHelper } from "@/helper/reqHelper";
import { moviesSchema } from "@/schema/moviesSchema";

export const getMoviesAction = async ({
	page,
	query,
}: {
	page: number;
	query?: string;
}) => {
	try {
		const response = await reqHelper({
			method: "GET",
			endpoint: query ? `/search/movie` : "/movie/popular",
			page,
			query,
		});

		const result = moviesSchema.safeParse(response.results);

		if (!result.success) {
			console.error(
				`Response value has changed. Error: ${
					result.error
				}. At: ${new Date().toISOString()}`
			);
			throw new Error(
				"Sorry, there seems to be an issue with our server. Please contact us."
			);
		}
		return result.data;
	} catch (error) {
		console.error(`Error fetching popular movies: ${error}`);
		throw error;
	}
};
