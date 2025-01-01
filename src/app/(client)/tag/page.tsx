import Header from "@/app/components/header";
import { Tag } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React from "react";

async function getTags() {
  const query = `
    *[_type == "tag"]{
  name,
  slug,
  _id,
  "postCount": count( *[_type == "post" && references("tags",^._id)])
}
    `;
  const tags = client.fetch(query);
  return tags;
}

export const revalidate = 60;

const Page = async () => {
    const tags:Tag[]= await getTags()
    console.log(tags,"tags")

  return (
    <div>
        <Header title="Tags"/>
        <div>
            {tags?.length > 0 && tags?.map((tag)=>(
                <Link href={`/tag/${tag.slug.current}`} key={tag?._id}>
                    <div className="mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-950 hover:text-purple-500">
                         #{tag.name}({tag?.postCount})
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
};

export default Page;
