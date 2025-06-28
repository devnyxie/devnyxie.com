import { Calendar, Flower, Folder, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../components/input";
import { Button } from "../components/btn";

const posts = [
  {
    title: "push_swap: Bitwise Radix Sort",
    description:
      "Explanation and implementation of a bitwise radix sort algorithm for the push_swap project.",
    date: "2023-10-01",
    link: "/posts/internalizing-the-web",
    image:
      "https://i.pinimg.com/736x/a3/8d/7c/a38d7c78e53ad9a6aae7820726a7b0d0.jpg",
    tags: ["C", "algorithm"],
  },
  {
    title: "Go Types in Depth",
    description: "A comprehensive guide to understanding all Go types.",
    date: "2023-09-15",
    link: "/posts/the-art-of-note-taking",
    image:
      "https://i.pinimg.com/736x/47/07/7a/47077afadae63d23218df3b9920b639b.jpg",
    tags: ["Go", "Basics"],
  },
  {
    title: "so_long: 2D Game in C",
    description:
      "The so_long project is a simple game in C that uses the MinilibX library for graphics and user input.",
    date: "2023-08-20",
    link: "/posts/building-a-digital-garden",
    image:
      "https://i.pinimg.com/736x/3c/ab/89/3cab8929fcd398e17efeeb29435a6782.jpg",
    tags: ["C", "Game Development", "MinilibX"],
  },
  {
    title: "GNL: Efficient Buffer Management in C",
    description: "A guide to managing buffer for efficient data handling in C.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/04/9c/6a/049c6ae1db6f8b571cefdb6e95735edd.jpg",
    tags: ["C", "Memory Management", "Low-Level Programming"],
  },
  {
    title: "Raspi Part 1: Setup & Cloudflare Tunnel",
    description: "A deep dive into the Zettelkasten method.",
    date: "2023-07-10",
    link: "/posts/understanding-zettelkasten",
    image:
      "https://i.pinimg.com/736x/49/3f/d6/493fd6b10b2fe259414f7d06e4625647.jpg",
    tags: ["knowledge", "zettelkasten"],
  },
  {
    title: "The Power of Linking Notes 3",
    description: "How to connect your ideas effectively.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/50/dc/41/50dc41c3f1d6f199d09533c7faa867e2.jpg",
    tags: ["knowledge", "linking notes"],
  },
];

const Card = ({ title, image, description, date, link, tags, folder }: any) => {
  const borderedClass = "";
  return (
    <div
      className={`bg-background-secondary p-6 rounded-sm transition-shadow ${borderedClass} duration-200 col-span-1 h-full`}
    >
      <img
        src={image}
        alt={title}
        className="object-cover rounded-sm mb-4 w-full h-[125px]"
        loading="lazy"
      />

      <div className="gap-2 flex flex-col h-full">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex gap-1 items-center">
          <Calendar size={16} />
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* <p className="text-sm text-zinc-500 dark:text-zinc-400 flex gap-1 items-center">
          <Folder size={16} /> {folder}
        </p> */}
        <Link href={link} className="text-lg font-medium hyphens-auto">
          {title}
        </Link>
        <p className="text-zinc-600 dark:text-zinc-400 break-words hyphens-auto">
          {description}
        </p>

        <div className="tags flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <Link
              href={`/tags/${tag}`}
              key={index}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm text-xs "
              // className="border border-yellow-500 bg-amber-500/10 hover:bg-amber-500/30 px-2 py-1 rounded-full text-xs transition-colors duration-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="container-medium mt-16 mx-4">
        <div className="hero-section mb-8">
          <div className="flex gap-2 items-center">
            <div className="text-3xl font-bold">Sumi Library</div>
            <img
              src="/cherry-blossom-white.svg"
              className="w-12 h-12 mt-2 text-red-500"
              alt="Cherry Blossom"
            />
          </div>

          <div className="text-xl font-light text-zinc-400">
            Tim's Digital Garden
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Welcome. This is my little, minimalistic digital garden on the
            Internet.
          </p>
          <div className="mt-4 flex gap-2">
            <Input
              type="text"
              placeholder="What are you searching for?"
              className="w-full max-w-md"
            />
            <Button className="flex items-center justify-center w-min">
              <ListFilter size={16} />
            </Button>
          </div>
        </div>
        <hr className="mt-8 mb-8 text-outline" />
        <div className="">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => {
                return (
                  <Card
                    key={post.title}
                    title={post.title}
                    image={post.image}
                    description={post.description}
                    date={post.date}
                    link={post.link}
                    tags={post.tags}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-zinc-500 dark:text-zinc-400 mt-8">
              No posts available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
