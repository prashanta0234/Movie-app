import React from "react";
import SearchInput from "./SearchInput";
import { Clock9 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
	return (
		<div className="sticky top-0 z-50 min-h-14 w-full bg-primary flex justify-center items-center">
			<div className="container flex h-full w-full items-center justify-between px-4 ">
				<div>
					<p className="font-bold text-xl text-white">Logo</p>
				</div>
				<div className="w-[50%] hidden md:block">
					<SearchInput />
				</div>
				<div className="flex gap-3 items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href={"/"}>
									<Clock9 className="text-white cursor-pointer" />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Watch list</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
};

export default Nav;
