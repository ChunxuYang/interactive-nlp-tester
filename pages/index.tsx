import { GetStaticProps } from "next";
import fs from "fs";
import Link from "next/link";
import { generateRssFeed } from "../utils/generate-rss";

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed();
  // read public/blogs directory
  // return list of blog names
  const blogs = fs
    .readdirSync("public/blogs")
    .filter((blog) => blog.endsWith(".txt"))
    .map((blog) => blog.replace(".txt", ""));
  return { props: { blogs } };
};

export default function Home({ blogs }: { blogs: string[] }) {
  return (
    <div className="px-6 py-12 max-w-xl mx-auto">
      <h1 className="font-bold text-5xl mb-12">Blogs</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog}`}
            key={blog + Math.random().toString()}
            className="block p-4 border border-gray-200 hover:border-gray-500 rounded-lg"
          >
            {blog}
          </Link>
        ))}
      </div>
    </div>
  );
}
