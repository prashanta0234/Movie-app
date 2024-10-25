import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Watchlist from "@/components/watchlist/WatchList";
import Link from "next/link";
import React from "react";

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
