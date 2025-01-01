import Header from "@/app/components/header";
import PostComponent from "@/app/components/postComponent";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import React from "react";

interface Params{
    params:{
        slug:string
    }
}

async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "post"  && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
     tags[]->{
    _id,
    slug,
    name
    }
}
    `;
  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

const Page = async  ({params}:Params) => {
    const posts:Array<Post>= await getPostsByTag(params.slug)
    console.log(posts,"post by tags")
  return (
    <div>
      <Header title={`#${params?.slug}`} tags />
      <div>
        {posts?.length > 0 && posts?.map((post)=>(
            <PostComponent key={post?._id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default Page;
