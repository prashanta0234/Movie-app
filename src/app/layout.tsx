import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "../components/shared/Nav";
import { Suspense } from "react";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Movie app",
	description: "Worlds most popular movie site",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center w-full flex-col`}
			>
				<Suspense fallback={<p>Loading</p>}>
					<Nav />
					<div className="my-10 container px-4">{children}</div>
				</Suspense>
			</body>
		</html>
	);
}
