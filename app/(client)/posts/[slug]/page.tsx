import Header from "@/app/components/Header"
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import {VT323} from "next/font/google"
import Link from "next/link";

const dateFont = VT323({weight: "400", subsets: ["latin"]});

interface Params {
  params: {
    slug: string;
  }
}

async function getPosts(slug: string) {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0]{
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
    }`;

    const post = await client.fetch(query);
    return post;
}

async function page({params}: Params) {

  const post: Post = await getPosts(params.slug);

  return (
    <div>
      <Header title={post.title} />
      <div className="text-center">
        <span className={`${dateFont.className} text-purple-500`}>{new Date(post.publishedAt).toDateString()}</span>
        <div className="mt-5">
          {post.tags.map((tag) => (
            <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">#{tag.name}</span>
            </Link>
          ))}
        </div>

        <PortableText value={post.body} />
      </div>
    </div>
  )
}

export default page