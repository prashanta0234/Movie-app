import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Watchlist from "@/components/watchlist/WatchList";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "Watchlist - Movie app",
	description: "Worlds most popular movie site",
};
const page = () => {
	return (
		<div>
			<Breadcrumb className="my-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">Home</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbPage>
						<Link href="/watchlist">Watchlist</Link>
					</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<Watchlist />
		</div>
	);
};

export default page;
