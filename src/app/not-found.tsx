import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen ">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<p className="text-xl mb-6">
					Oops! The page you’re looking for doesn’t exist.
				</p>
				<Link href="/">
					<Button variant="outline" className="px-4 py-2">
						Go back to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
