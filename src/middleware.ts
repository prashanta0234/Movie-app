import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
	const isAuthenticated = request.cookies.has("user-token");

	if (isAuthenticated) {
		return NextResponse.next();
	}

	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = "/auth";

	return NextResponse.redirect(redirectTo);
};

export const config = {
	matcher: ["/watchlist/:path*"],
};
