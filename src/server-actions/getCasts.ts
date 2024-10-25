"use server";

import { reqHelper } from "@/helper/reqHelper";
import { CastsSchema } from "@/schema/castSchema";

const getCastAction = async (id: number) => {
	const response = await reqHelper({
		method: "GET",
		endpoint: `/movie/${id}/credits`,
	});
	const result = CastsSchema.safeParse(response.cast);

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
};
export default getCastAction;
