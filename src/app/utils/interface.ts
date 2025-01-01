import { PortableTextBlock } from "next-sanity";

export interface Post{
    title:string
    slug:{current:string};
    publishedAt:string;
    excerpt:string;
    body:PortableTextBlock;
    tags?:Tag[];
    _id:string;
    
}

export interface Tag{
    name:string
    slug:{current:string};
    _id:string;
    postCount?: number

}

export interface SanityImageSource {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
    alt?: string;
  }