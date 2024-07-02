import { TEMPLATE } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TemplateCard = (item: TEMPLATE) => {
  return (
    <Link href={`/dashboard/content/` + item.slug}>
      <div className="border hover:scale-105 transition-all hover:bg-secondary/60 bg-white h-full w-full p-4 lg:p-6 rounded-lg">
        <div className="flex flex-col gap-4">
          <Image src={item.icon} width={50} height={50} alt={item.category} />
          <h4 className="text-lg font-bold lg:text-xl">{item.name}</h4>
          <p className="line-clamp-2">{item.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default TemplateCard;
