import * as React from "react";

import { GetStaticProps, GetStaticPaths } from "next";

import fs from "fs";

export const getStaticPaths: GetStaticPaths = async () => {
  // read public/blogs directory
  // return list of blog names
  const blogs = fs
    .readdirSync("public/blogs")
    .filter((blog) => blog.endsWith(".txt"))
    .map((blog) => blog.replace(".txt", ""));
  const paths = blogs.map((blog) => ({
    params: { blog },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // read public/blogs/[blog]
  // return content
  const content = fs.readFileSync(`public/blogs/${params?.blog}.txt`, "utf-8");

  return { props: { content } };
};

export default function Blog({ content }: { content: string }) {
  // split content into lines, emit empty lines
  const contentSplit = content.split("\n").filter((line) => line !== "");
  const [title, ...body] = contentSplit;

  return (
    <div className="py-12 max-w-xl mx-auto">
      <h1 className="font-bold text-5xl mb-12">{title}</h1>
      {body.map((line, i) => (
        <p key={i} className="mb-4">
          {line}
        </p>
      ))}
    </div>
  );
}
