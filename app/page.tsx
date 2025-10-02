import FadeIn from "@/app/components/animations/fadeIn";
import RowPost from "@/app/components/blog/post";
// Removed direct import of GitHeroSection
import Heading from "@/app/components/heading";
import AboutMe from "@/app/components/landing/aboutMe";
import Experience from "@/app/components/landing/experience";
import Hero from "@/app/components/landing/hero";
import Container from "@/app/components/layout/container";
import List from "@/app/components/layout/list";
import Gaps from "@/app/components/layout/gaps";
import SkillsBento from "@/app/components/skills/skills-bento";
import { Button } from "@/app/components/button";
import { getAllPosts } from "@/lib/api/blog/blog";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";
import { PostInput } from "@/lib/types/data/blog";
import { IndexPageType } from "@/lib/types/pages";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from 'next/dynamic';

// Dynamically import GitHeroSection
const GitHeroSectionLazy = dynamic(
  () => import("@/app/components/github/github_heroSection"),
  { 
    loading: () => <div className="w-full h-[200px] bg-accent/10 rounded-lg animate-pulse flex items-center justify-center text-muted-foreground">Loading GitHub stats...</div>,
    ssr: true
  }
);

export default async function Home() {
  const pageData: IndexPageType = getPageData("index");
  const { picture, meetingLink, available } = getConfig();

  const posts: PostInput[] = await getAllPosts();

  return (
    <Container>
      <Gaps>
        <Hero
          title={pageData.title}
          description={pageData.description}
          picture={picture}
          meetingLink={meetingLink}
          available={available}
          links={pageData.hero.links}
        />

        {/* Make client components so we can use framer motion */}
        <List asGrid cols="1 md:2" gap="8" className="!pt-0">
          {/* About Me */}
          <AboutMe
            title={pageData.about.title}
            description={pageData.about.description}
          />
          {/* Work Experience */}
          <Experience experience={pageData.experience} />
        </List>

        {/* Skills Section */}
        <FadeIn delay={0.7}>
          <Heading size="default" className="mb-2">{pageData.skills.title}</Heading>
          <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground mb-4">
            {pageData.skills.description}
          </p>
          <SkillsBento skills={pageData.skills.items} />
        </FadeIn>
        <FadeIn delay={0.7}>
          <Suspense fallback={<div className="w-full h-[200px] bg-accent/10 rounded-lg animate-pulse flex items-center justify-center text-muted-foreground">Loading GitHub data...</div>}>
            <GitHeroSectionLazy />
          </Suspense>
        </FadeIn>
        <FadeIn delay={0.7}>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Heading className="mb-2" size="default">
                {pageData.blog.title}
              </Heading>
              <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground">
                {pageData.blog.description}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">More</Link>
            </Button>
          </div>
          <List asGrid cols="1 sm:2" gap="4">
            {posts.length > 0 ? (
              <>
                {posts.slice(0, 6).map((post) => (
                  <RowPost key={post.slug} {...post} image="" />
                ))}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No posts found.</p>
            )}
          </List>
        </FadeIn>
      </Gaps>
    </Container>
  );
}
