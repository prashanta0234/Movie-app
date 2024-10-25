type TFetchOption = {
	method: "POST" | "PATCH" | "GET" | "DELETE" | "PUT";
	body?: unknown;
	endpoint: string;
	query?: string;
	page?: number;
};

export const reqHelper = async ({
	method,
	endpoint,
	query,
	page = 1,
}: TFetchOption) => {
	const apiKey = process.env.API_KEY;
	const backendUrl = process.env.BACKEND_URL;

	const fetchOptions: RequestInit = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const response = await fetch(
			`${backendUrl}${endpoint}?api_key=${apiKey}&query=${query}&page=${page}
			`,
			fetchOptions
		);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Request failed:", error);
		throw error;
	}
};
