import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeltonList = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
				<Skeleton className="w-full h-[400px] p-2" key={idx}>
					<Skeleton className="w-full h-[60%] bg-slate-400" />
					<div className="flex justify-between my-3 gap-4">
						<Skeleton className="flex-1 h-[20px] bg-slate-400" />
						<Skeleton className="w-[20%] h-[40px] bg-slate-400" />
					</div>
					<Skeleton className="w-full h-[20px] bg-slate-400 my-3" />
					<Skeleton className="w-full h-[20px] bg-slate-400 my-3" />
				</Skeleton>
			))}
		</div>
	);
};

export default SkeltonList;
