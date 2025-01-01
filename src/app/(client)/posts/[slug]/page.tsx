import Header from "@/app/components/header";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const vt = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current== "${slug}"][0]{
  title,
  slug,
  publishedAt,
  excerpt,
  _id,
  body,
  tags[]->{
    _id,
    slug,
    name
  }
}
    `;
  const post: Post = await client.fetch(query);
  return post;
}

export const revalidate=60;

const Page = async ({ params }: Params) => {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="text-center">
      <Header title={post.title} />
      <div>
        <span className={`${vt.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 rounded-md text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={richTextStyles}>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

const myPortableTextComponents = {
  types: {
    image: ({ value }:{ value: SanityImageSource }) => (
      <Image src={urlFor(value).url()} alt="Post" width={700} height={700} />
    ),
  },
};

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-headings:text-lg
prose-headings:font-bold
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
