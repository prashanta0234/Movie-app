import { cookies } from "next/headers";

type TFetchOption = {
	method: "POST" | "PATCH" | "GET" | "DELETE" | "PUT";
	body?: unknown;
	endpoint: string;
	query?: string;
	page?: number;
};
export const getBearerToken = () => {
	const token = cookies().get("user-token")?.value;
	return token;
};

export const reqHelper = async ({
	method,
	endpoint,
	body,
	query,
	page,
}: TFetchOption) => {
	const token = await getBearerToken();

	const apiKey = process.env.API_KEY;
	const backendUrl = process.env.BACKEND_URL;

	const fetchOptions: RequestInit = {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	if (method !== "GET" && body) {
		fetchOptions.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(
			`${backendUrl}${endpoint}?api_key=${apiKey}&query=${query}&page=${page}`,
			fetchOptions
		);

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Request failed:", error);
		throw error;
	}
};
