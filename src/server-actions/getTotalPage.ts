"use server";

import { reqHelper } from "@/helper/reqHelper";

const getTotalPageAction = async () => {
	const response = await reqHelper({
		method: "GET",
		endpoint: "/movie/popular",
		page: 1,
	});

	return response.total_pages;
};
export default getTotalPageAction;
