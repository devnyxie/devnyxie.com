import { Calendar, Flower, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    folder: "Programming",
  },
  {
    title: "Go Types in Depth",
    description: "A comprehensive guide to understanding all Go types.",
    date: "2023-09-15",
    link: "/posts/the-art-of-note-taking",
    image:
      "https://i.pinimg.com/736x/47/07/7a/47077afadae63d23218df3b9920b639b.jpg",
    tags: ["Go"],
    folder: "Programming",
  },
  {
    title: "so_long: 2D Game in C",
    description:
      "The so_long project is a simple game in C that uses the MinilibX library for graphics and user input.",
    date: "2023-08-20",
    link: "/posts/building-a-digital-garden",
    image:
      "https://i.pinimg.com/736x/3c/ab/89/3cab8929fcd398e17efeeb29435a6782.jpg",
    tags: ["knowledge", "digital garden"],
    folder: "Knowledge",
  },
  {
    title: "GNL: Efficient Buffer Management in C",
    description: "A guide to managing buffer for efficient data handling in C.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/04/9c/6a/049c6ae1db6f8b571cefdb6e95735edd.jpg",
    tags: ["C", "Memory Management", "Low-Level Programming"],
    folder: "Programming",
  },
  {
    title: "Understanding Zettelkasten",
    description: "A deep dive into the Zettelkasten method.",
    date: "2023-07-10",
    link: "/posts/understanding-zettelkasten",
    image:
      "https://i.pinimg.com/736x/49/3f/d6/493fd6b10b2fe259414f7d06e4625647.jpg",
    tags: ["knowledge", "zettelkasten"],
    folder: "Knowledge",
  },
  {
    title: "The Power of Linking Notes 3",
    description: "How to connect your ideas effectively.",
    date: "2023-06-05",
    link: "/posts/the-power-of-linking-notes",
    image:
      "https://i.pinimg.com/736x/50/dc/41/50dc41c3f1d6f199d09533c7faa867e2.jpg",
    tags: ["knowledge", "linking notes"],
    folder: "Knowledge",
  },
];

const Card = ({ title, image, description, date, link, tags, folder }: any) => {
  return (
    <div className=" bg-[#131314] p-6 rounded-sm transition-shadow border border-default duration-200 col-span-1 h-full flex justify-between gap-4">
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
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm text-xs"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 w-[150px] h-full relative">
        <img
          src={image}
          alt={title}
          className="object-cover rounded-sm absolute top-0 left-0 w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-default bg-secondary px-3 py-2 text-base ring-offset-background",
          // File input specific styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // Placeholder styles
          "placeholder:text-muted-foreground",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Mobile responsive text size
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default function Home() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="max-w-[850px] mt-16 mx-4">
        <div className="hero-section mb-8">
          <div className="text-3xl font-bold">Sumi Library</div>
          <div className="text-xl font-light text-zinc-400">
            Tim's Digital Garden
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Welcome. This is my little, minimalistic digital garden on the
            Internet.
          </p>
          <div className="mt-4">
            <Input
              type="text"
              placeholder="What are you searching for?"
              className="w-full max-w-md"
            />
          </div>
        </div>

        <div className="">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post, index) => {
                if (index > 2) return null;
                return (
                  <Card
                    key={post.title}
                    title={post.title}
                    image={post.image}
                    description={post.description}
                    date={post.date}
                    link={post.link}
                    tags={post.tags}
                    folder={post.folder}
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
