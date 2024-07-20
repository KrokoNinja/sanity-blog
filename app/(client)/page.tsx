import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import { Post } from "../utils/interface";

async function getPosts() {
  const query = `*[_type == "post"]{title,slug,publishedAt,excerpt}`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {

  const posts: Post[] = await getPosts();
  console.log(posts);

  return (
    <div>
      <Header title="Articles" />
      <div>
        {posts?.length > 0 && posts?.map((post) => {
            return <p key={post._id}>{post.title}</p>
          })}
      </div>
    </div>
  );
}
