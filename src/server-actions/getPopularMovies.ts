"use server";

import { reqHelper } from "@/helper/reqHelper";
import { moviesSchema } from "@/schema/moviesSchema";

export const getPopularMoviesAction = async ({ page }: { page: number }) => {
	const response = await reqHelper({
		method: "GET",
		endpoint: `/movie/popular`,
		page,
	});

	const result = moviesSchema.safeParse(response.results);
	console.log(result.success);
	if (!result.success) {
		console.error(
			`Response value is change please recheck. Error: ${
				result.error
			}. At: ${Date.now()}`
		);
		throw Error(
			"Sorry we have an issue in our server. Please contact with us."
		);
	}
	return result.data;
};
