import FadeIn from "@/components/animations/fadeIn";
import RowPost from "@/components/blog/post";
import GitHeroSection from "@/components/github/github_heroSection";
import Heading from "@/components/heading";
import AboutMe from "@/components/landing/aboutMe";
import Experience from "@/components/landing/experience";
import Hero from "@/components/landing/hero";
import Container from "@/components/layout/container";
import Gaps from "@/components/layout/gaps";
import SkillsBento from "@/components/skills/skills-bento";
import { getAllPosts } from "@/lib/api/blog/blog";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";
import { PostInput } from "@/lib/types/data/blog";
import { IndexPageType } from "@/lib/types/pages";

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
        <div className="!pt-0 flex flex-col gap-8 md:grid md:grid-cols-2">
          {/* About Me */}
          <AboutMe
            title={pageData.about.title}
            description={pageData.about.description}
          />
          {/* Work Experience */}
          <Experience experience={pageData.experience} />
        </div>

        {/* Skills Section */}
        <FadeIn delay={0.7}>
          <div className="mb-4">
            <Heading size="default">{pageData.skills.title}</Heading>
          </div>
          <p className="text-balance text-left text-sm sm:text-md lg:text-sm text-muted-foreground mb-6">
            {pageData.skills.description}
          </p>
          <SkillsBento skills={pageData.skills.items} />
        </FadeIn>
        <FadeIn delay={0.7}>
          <GitHeroSection />
        </FadeIn>
        <FadeIn delay={0.7}>
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
        </FadeIn>
      </Gaps>
    </Container>
  );
}
