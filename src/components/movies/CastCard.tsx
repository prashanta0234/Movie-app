import { imageMaker } from "@/helper/imageMaker";
import { CastType } from "@/schema/castSchema";
import Image from "next/image";
import React from "react";

const CastCard = ({ cast }: { cast: CastType }) => {
	return (
		<div className="w-full h-auto shadow-lg border border-primary dark:bg-white">
			<Image
				alt={cast.name}
				src={imageMaker(cast.profile_path as string)}
				width={500}
				height={500}
				className="w-full"
			/>
			<div className="p-2">
				<p className="dark:text-black">{cast.name}</p>
				<p className="dark:text-black">
					<span className="font-bold text-primary">character:</span>{" "}
					{cast.character}
				</p>
			</div>
		</div>
	);
};

export default CastCard;
