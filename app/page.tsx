import RowPost from "@/components/blog/post";
import GitHeroSection from "@/components/github/github_heroSection";
import Heading from "@/components/heading";
import Hero from "@/components/landing/hero";
import Gaps from "@/components/layout/gaps";
import { getAllArticles } from "@/lib/api/articles";
import { getAllPosts } from "@/lib/api/blog";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";
import { PostInput } from "@/lib/types/data/blog";
import { IndexPageType } from "@/lib/types/pages";
import { formatDate } from "@/lib/utils";
import { format } from "path";

export default async function Home() {
  const pageData: IndexPageType = getPageData("index");
  const { picture, meetingLink, available } = getConfig();

  const posts: PostInput[] = await getAllPosts();

  return (
    <Gaps>
      <Hero
        title={pageData.title}
        description={pageData.description}
        picture={picture}
        meetingLink={meetingLink}
        available={available}
        links={pageData.hero.links}
      />
      <div className="!pt-0 flex flex-col gap-8 md:grid md:grid-cols-2">
        {/* About Me */}
        <div className="px-0 !pt-0 gap-8 sm:gap-6 lg:gap-8">
          <div className="mb-4">
            <Heading size="default">{pageData.about.title}</Heading>
          </div>
          <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground">
            {pageData.about.description}
          </p>
        </div>
        {/* Work Experience */}
        <div className="px-0 !pt-0 gap-8 sm:gap-6 lg:gap-8">
          <div className="mb-4">
            <Heading size="default">{pageData.experience.title}</Heading>
          </div>
          <ul className="list-disc list-inside text-sm sm:text-md lg:text-sm flex flex-col gap-2">
            {pageData.experience.items.map((item, index) => (
              <li
                key={item.position}
                className="w-full flex items-center gap-1 text-sm"
              >
                <div className="text-muted-foreground">
                  {typeof item.date === "string"
                    ? item.date
                    : formatDate(item.date)}
                </div>
                <hr className="grow bg-muted/50" />
                <div className="font-sm">{item.position}</div>
                <span>at</span>
                <a href={item.company.url} className="underline">
                  {item.company.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GitHeroSection />
      <div>
        <Heading className="mb-2" size="default">
          {pageData.blog.title}
        </Heading>
        <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground">
          {pageData.blog.description}
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.length > 0 ? (
            <>
              {posts.slice(0, 6).map((post) => (
                <RowPost key={post.slug} {...post} image="" />
              ))}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No posts found.</p>
          )}
        </div>
      </div>
    </Gaps>
  );
}
