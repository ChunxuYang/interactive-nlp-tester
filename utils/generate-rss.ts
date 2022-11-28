import fs from "fs";
import { Feed } from "feed";
import { randomUUID } from "crypto";

export const generateRssFeed = async () => {
  const feedFiles = fs
    .readdirSync("public/blogs")
    .filter((file) => file.endsWith(".txt"));
  const author = {
    name: "Some Author",
    email: "xxx@email.com",
    link: "https://www.example.com",
  };

  const date = new Date();

  const feed = new Feed({
    title: "Some Title",
    description: "Some Description",
    id: randomUUID(),
    link: "https://www.example.com",
    language: "en",
    author,
    copyright: "Some Copyright",
  });

  feedFiles.forEach((file) => {
    const content = fs.readFileSync(`public/blogs/${file}`, "utf8");
    const [title, ...rest] = content.split("\n");
    const description = rest[0].concat("...");

    feed.addItem({
      title,
      id: randomUUID(),
      link: "some link",
      description,
      author: [author],
      date,
      content,
    });

    fs.writeFileSync("public/rss.xml", feed.rss2());
  });
};
